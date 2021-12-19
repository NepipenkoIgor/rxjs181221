import '../../assets/css/style.css';
import { concatMap, fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';

// const sequence$ = interval(2000).pipe(
// 	map((v) => {
// 		return of(v * 2);
// 	}),
// );
//
// sequence$.subscribe((v) => {
// 	v.subscribe((z) => {
// 		console.log(z);
// 	});
// });

const inputEl = document.querySelector('input') as HTMLInputElement;

fromEvent(inputEl, 'input')
	.pipe(
		concatMap((event) => {
			const { value } = event.target as HTMLInputElement;
			console.log(value);
			return ajax({
				url: `http://learn.javascript.ru/courses/groups/api/participants?key=mc4n38&text=${value}`,
				method: 'GET',
				crossDomain: true,
			});
		}),
		// concatAll(),
		// mergeAll(2)
		// map+ switchAll = switchMap
		// map+ exhaustAll = exhaustMap
		// map+ mergeAll = mergeMap
		// map+ concatAll = concatMap = mergeMap(1)
	)
	.subscribe((v) => {
		console.log(v);
	});
