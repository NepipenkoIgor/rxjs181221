import { concatAll, map, Observable, shareReplay, switchMap, timer, toArray } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';

class UserService {
	// public uniqueNameSequence$: Observable<string[]> = ajax({
	// 	url: 'http://learn.javascript.ru/courses/groups/api/participants?key=mc4n38',
	// 	method: 'GET',
	// 	crossDomain: true,
	// }).pipe(
	// 	map((res: AjaxResponse<any>) => res.response),
	// 	concatAll(),
	// 	map((user: any) => user.profileName),
	// 	toArray(),
	// 	shareReplay(),
	// 	// share({
	// 	// 	connector: () => new ReplaySubject(),
	// 	// 	resetOnError: false,
	// 	// 	resetOnComplete: false,
	// 	// 	resetOnRefCountZero: false,
	// 	// }),
	// );
	public uniqueNameSequence$: Observable<string[]> = timer(0, 16000).pipe(
		switchMap(() => {
			return ajax({
				url: 'http://learn.javascript.ru/courses/groups/api/participants?key=mc4n38',
				method: 'GET',
				crossDomain: true,
			}).pipe(
				map((res: AjaxResponse<any>) => res.response),
				concatAll(),
				map((user: any) => user.profileName),
				toArray(),
				// share({
				// 	connector: () => new ReplaySubject(),
				// 	resetOnError: false,
				// 	resetOnComplete: false,
				// 	resetOnRefCountZero: false,
				// }),
			);
		}),
		shareReplay(),
	);
}

export const userService = new UserService();
