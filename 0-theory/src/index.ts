import '../../assets/css/style.css';

// console.log('start');
// setTimeout(() => console.log('time 1'));
// setTimeout(() => console.log('time 2'));
// Promise.resolve().then(() => console.log('promise 1'));
// Promise.resolve().then(() => console.log('promise 2'));
// console.log('end');

// import { asyncScheduler, bufferCount, observeOn, of, tap } from 'rxjs';
//
// console.log('start');
// of(1, 2, 3, 4, 5)
// 	.pipe(
// 		tap((v) => {
// 			console.log('TAP 1', v);
// 		}),
// 		bufferCount(2),
// 		observeOn(asyncScheduler),
// 		tap((v) => {
// 			console.log('TAP 2', v);
// 		}),
// 	)
// 	.subscribe((v) => console.log('SUB 1', v));
// console.log('end');
//
// const sequence1$ = scheduled([1, 2], asapScheduler);
// const sequence2$ = of(10);
//
// combineLatest([sequence1$, sequence2$])
// 	.pipe(map(([x, y]) => x + y))
// 	.subscribe((v) => {
// 		console.log(v);
// 	});

import { observeOn, queueScheduler, Subject, take } from 'rxjs';

let count = 1;
const signal = new Subject();
const calc = (c: number) => console.log('Do something', c);

console.log('Start');
signal.pipe(take(1600), observeOn(queueScheduler)).subscribe(() => {
	calc(count);
	signal.next(count++);
});
signal.next(count++);
console.log('End');
