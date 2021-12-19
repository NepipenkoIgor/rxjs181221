//import '../../assets/css/style.css';

// import { interval, share } from 'rxjs';

// const controlSequence$ = new Subject();
// const connectableSequence$ = interval(1000).pipe(
// 	// multicast(controlSequence$),
// 	// publish(),
// 	// refCount(),
// 	share(),
// );
// as ConnectableObservable<any>;

// const sub = connectableSequence$.subscribe((v) => {
// 	console.log('Sub 1', v);
// });
//
// setTimeout(() => {
// 	console.log(sub);
// 	// sub.unsubscribe();
// 	// connectableSequence$.connect();
// }, 2000);
//
// setTimeout(() => {
// 	connectableSequence$.subscribe((v) => {
// 		console.log('Sub 2', v);
// 	});
// }, 5000);

import { interval, share, Subject } from 'rxjs';

// const sequence$ = connectable(, {
//     connector: () => new Subject(),
// });

const sequence$ = interval(1000).pipe(
	share({
		connector: () => new Subject(),
	}),
);

const sub = sequence$.subscribe((v) => {
	console.log('Sub 1', v);
});

setTimeout(() => {
	console.log(sub);
	// sub.unsubscribe();
	//sequence$.connect();
}, 2000);

setTimeout(() => {
	sequence$.subscribe((v) => {
		console.log('Sub 2', v);
	});
}, 5000);
