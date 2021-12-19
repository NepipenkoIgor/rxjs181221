// import '../../assets/css/style.css';
//
// // Subject = Observable + Observer
//
// // import { AsyncSubject } from 'rxjs';
//
// // const sequence$ = new Subject();
// // const sequence$ = new BehaviorSubject(-1);
// // const sequence$ = new ReplaySubject(undefined, 1500);
// // const sequence$ = new AsyncSubject(); // console.log(sequence$.value);
// // sequence$.next(1);
// // sequence$.next(2);
// // sequence$.next(3);
// //
// // sequence$.subscribe((v) => {
// // 	console.log('Sub 1 ===>', v);
// // });
// //
// // setTimeout(() => {
// // 	sequence$.next(4);
// // }, 2000);
// //
// // setTimeout(() => {
// // 	// sequence$.complete();
// // 	sequence$.next(5);
// // }, 4000);
// //
// // setTimeout(() => {
// // 	sequence$.subscribe((v) => {
// // 		console.log('Sub 2 ===>', v);
// // 	});
// // }, 5000);
// //
// // setTimeout(() => {
// // 	sequence$.complete();
// // 	sequence$.subscribe((v) => {
// // 		console.log('Sub 3 ===>', v);
// // 	});
// // }, 7000);
//
// import { AsyncSubject, map, Observable, Subject } from 'rxjs';
// import { ajax, AjaxResponse } from 'rxjs/ajax';
//
// function cachedRequest<T>(url: string) {
// 	let subject: AsyncSubject<T>;
// 	return new Observable((subscriber) => {
// 		if (!subject) {
// 			subject = new AsyncSubject<T>();
// 			ajax({ url, crossDomain: true })
// 				.pipe(map((res: AjaxResponse<any>) => res.response))
// 				.subscribe(subject);
// 		}
// 		return subject.subscribe(subscriber);
// 	});
// }
//
// const users$ = cachedRequest(
// 	'http://learn.javascript.ru/courses/groups/api/participants?key=mc4n38',
// );
//
// const rxjsRepos = cachedRequest('https://api.github.com/search/repositories?q=rxjs');
//
// users$.subscribe((res) => {
// 	console.log('RES 1 ====>', res);
// });
//
// rxjsRepos.subscribe((res) => {
// 	console.log('RES 3 ====>', res);
// });
//
// setTimeout(() => {
// 	users$.subscribe((res) => {
// 		console.log('RES 2 ====>', res);
// 	});
//
// 	rxjsRepos.subscribe((res) => {
// 		console.log('RES 4 ====>', res);
// 	});
// }, 5000);
//
// class Service {
// 	private _sequence$ = new Subject();
//
// 	public get sequence$() {
// 		return this._sequence$.asObservable();
// 	}
//
// 	public setData(data: any) {
// 		this._sequence$.next(data);
// 	}
// }
