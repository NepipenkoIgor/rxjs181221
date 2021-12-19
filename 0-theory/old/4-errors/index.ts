// import '../../assets/css/style.css';
// import { catchError, EMPTY, finalize, interval, map, of, switchMap, zip } from 'rxjs';
//
// const sequence1$ = interval(1000);
// const sequence2$ = of('1', '2', '3', 4, '5', '6', '7');
// const sequence$ = zip(sequence1$, sequence2$);
// // const dataSequence$ = sequence$.pipe(
// // 	// map(([, y]) => {
// // 	// 	try {
// // 	// 		return (y as any).toUpperCase(y);
// // 	// 	} catch (err) {
// // 	// 		console.log(err);
// // 	// 		return '100';
// // 	// 	}
// // 	// }),
// // 	switchMap(([, y]) => {
// // 		return of(y).pipe(
// // 			map((x) => {
// // 				return (x as any).toUpperCase(x);
// // 			}),
// // 			// catchError((err) => {
// // 			// 	console.log(err);
// // 			// 	return EMPTY;
// // 			// }),
// // 			// catchError(() => {
// // 			// 	return throwError(() => new Error('Custom Err'));
// // 			// }),
// // 			map((data) => ({ data, error: null })),
// // 			catchError((e) => {
// // 				return of({ data: null, error: 'Custom error' }); // throwError(() => new Error('Custom Err'));
// // 			}),
// // 		);
// // 	}),
// // 	// map(([, y]) => {
// // 	// 	return (y as any).toUpperCase(y);
// // 	// }),
// // 	// retry(3),
// // 	// retryWhen((errObs) => errObs.pipe(delay(3000))),
// // 	// catchError((err) => {
// // 	// 	console.log(err);
// // 	// 	return EMPTY;
// // 	// }),
// // );
// //
// // const errors$ = dataSequence$.pipe(
// // 	filter(({ error }) => Boolean(error)),
// // 	tap(() => {}),
// // );
//
// const dataSequence$ = sequence$.pipe(
// 	switchMap(([, y]) => {
// 		return of(y).pipe(
// 			map((x) => {
// 				return (x as any).toUpperCase(x);
// 			}),
// 			catchError(() => {
// 				return EMPTY; // throwError(() => new Error('Custom Err'));
// 			}),
// 		);
// 	}),
// );
//
// dataSequence$.subscribe({
// 	next: (v) => {
// 		console.log(v);
// 	},
// 	error: (err) => {
// 		console.log(err);
// 	},
// 	complete: () => {
// 		console.log('completed');
// 	},
// });
//
// const sequence1$ = interval(1000);
// const sequence2$ = of('1', '2', '3', 4, '5', '6', '7');
// const sequence$ = zip(sequence1$, sequence2$);
// const dataSequence$ = sequence$.pipe(
// 	switchMap(([, y]) => {
// 		return of(y).pipe(
// 			map((x) => {
// 				return (x as any).toUpperCase(x);
// 			}),
// 			catchError((err) => {
// 				console.log(err);
// 				return of('20', '30'); // throwError(() => new Error('Custom Err'));
// 			}),
// 			finalize(() => {
// 				console.log('FINALIZE');
// 			}),
// 		);
// 	}),
// );
//
// dataSequence$.subscribe({
// 	next: (v) => {
// 		console.log(v);
// 	},
// 	error: (err) => {
// 		console.log(err);
// 	},
// 	complete: () => {
// 		console.log('completed');
// 	},
// });
