import { interval, Observable, Subscriber, take, tap, pipe } from 'rxjs';

// function doNothing<T>(source: Observable<T>) {
// 	return source;
// }
//
// function toText<T>(_source: Observable<T>) {
// 	return new Observable((subscriber) => {
// 		subscriber.next('myText');
// 		subscriber.complete();
// 	});
// }

/*const pipe = (...fns: Function[]) => {
	return (source: Observable<any>) => {
		return fns.reduce((s, fn) => fn(s), source);
	};
};*/

class DoubleSubscriber extends Subscriber<number> {
	public override next(value: number) {
		super.next(value * 2);
	}
}

const double = (source: Observable<number>) => {
	return new Observable((subscriber) => {
		const sub = source.subscribe(new DoubleSubscriber(subscriber));
		// const sub = source.subscribe({
		// 	next: (v: number) => {
		// 		console.log('source');
		// 		subscriber.next(v * 2);
		// 	},
		// 	error: (err) => {
		// 		subscriber.error(err);
		// 	},
		// 	complete: () => {
		// 		subscriber.complete();
		// 	},
		// });
		return () => {
			sub.unsubscribe();
		};
	});
};

// const double = (source: Observable<number>) => {
// 	const o$ = new Observable();
// 	o$.source = source;
// 	o$.operator = {
// 		call(subscriber, s) {
// 			s.subscribe(new DoubleSubscriber(subscriber));
// 		},
// 	};
// 	return o$;
// };

// const double = (source: Observable<number>) => {
// 	return source.lift({
// 		call(subscriber, s) {
// 			s.subscribe(new DoubleSubscriber(subscriber));
// 		},
// 	});
// };

const doubleTap4 = pipe(
	double,
	tap(() => console.log('SIDE EFFECT')),
	take(4),
);

interval(1000)
	.pipe(doubleTap4)
	.subscribe((v) => {
		console.log(v);
	});
// -------1-1-1-1------1-1-1-1-----1-1-1-1
