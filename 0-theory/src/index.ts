import '../../assets/css/style.css';
// import { terminalLog } from '../../utils/log-in-terminal';
//
// terminalLog('Теория');

// const sequence = new Promise((res) => {
//     let count = 0;
//     setInterval(() => {
//         res(count++);
//     }, 1000)
// })
//
// sequence.then((v) => console.log(v));
// sequence.then((v) => console.log(v));
// sequence.then((v) => console.log(v));
// sequence.then((v) => console.log(v));
// sequence.then((v) => console.log(v));

// const sequence = function* iteratorFn() {
//     let item = 0;
//     while (true) {
//         yield item++;
//     }
// }();
//
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);

// import { interval } from "rxjs";
//
// interval(1000).subscribe((v) => {
//     console.log(v);
// })

// import { Observable, Subscriber } from "rxjs";
// let item = 0;
// const sequence = new Observable((subscriber: Subscriber<any>) => {
//     console.log('INIT');
//     const id = setInterval(() => {
//         if (item > 0 && item % 5 === 0) {
//             subscriber.complete();
//             return;
//         }
//         subscriber.next(item++);
//     }, 1000)
//     return () => {
//         console.log('Unsubscribed');
//         clearInterval(id);
//     }
// })
//
// const sub = sequence
//     .subscribe((v) => {
//         console.log(`Sub 1`, v);
//     })
//
// setTimeout(() => {
//     sub.unsubscribe()
// }, 3000)
//
// setTimeout(() => {
//     sequence
//         .subscribe({
//             next: (v) => {
//                 console.log(`Sub 2`, v);
//             },
//             complete: () => {
//                 console.log('COMPLETED');
//             }
//         })
// }, 5000)

import { filter, map, Observable, pluck, Subscriber } from 'rxjs';

const socket: WebSocket = new WebSocket(
	'wss://demo.piesocket.com/v3/channel_1?api_key=oCdCMcMPQpbvNjUIzqtvF1d2X2okWpDQj4AwARJuAgtjhzKxVEjQU6IdCjwm&notify_self',
);

const sequence$ = new Observable((subscriber: Subscriber<any>) => {
	console.log('INIT');

	function listener(e: Event) {
		subscriber.next(e);
	}

	socket.addEventListener('message', listener);

	return () => {
		console.log('Unsubscribed');
		socket.removeEventListener('message', listener);
	};
});

function main() {
	let count = 0;
	setInterval(() => {
		socket.send((count++).toString());
	}, 2000);
	sequence$
		.pipe(
			pluck('data'),
			filter((v) => {
				return !Number.isNaN(Number(v));
			}),
		)
		.subscribe((v) => {
			console.log('Sub 1 => ', v);
		});

	setTimeout(() => {
		sequence$
			.pipe(
				map((e) => e.data),
				filter((v) => {
					return !Number.isNaN(Number(v));
				}),
			)
			.subscribe((v) => {
				console.log('Sub 2 => ', v);
			});
	}, 7000);
}

socket.addEventListener('open', main);
