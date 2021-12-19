import {
	bufferCount,
	catchError,
	concatMap,
	debounceTime,
	distinctUntilChanged,
	EMPTY,
	filter,
	map,
	Observable,
	switchMap,
	tap,
	toArray,
} from 'rxjs';
import { AjaxResponse } from 'rxjs/ajax';

export interface IRepository {
	name: string;
	description: string;
	owner: {
		avatar_url: string;
	};
}

function crateCard({ name, description, owner: { avatar_url } }: IRepository): string {
	return `<div class="col-sm-6 col-md-4">
                <div class="card">
                    <img  class="card-img-top" src=${avatar_url} alt=${name}>
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text">${description}</p>
                    </div>
                </div>
           </div>`;
}

function createRow(htmlStrs: string[]) {
	return `<div class="row">${htmlStrs.join(' ')}</div>`;
}

export function liveSearch(
	source1$: Observable<InputEvent>,
	source2Fn: (text: string) => Observable<string>,
	loaderFn: (text: string) => void,
) {
	return source1$.pipe(
		debounceTime(300),
		map((e: Event) => {
			const { value } = e.target as HTMLInputElement;
			return value.trim();
		}),
		filter((text) => text.length > 3),
		distinctUntilChanged(),
		tap(loaderFn),
		switchMap(source2Fn),
	);
}

export function request(source$: Observable<AjaxResponse<{ items: IRepository[] }>>) {
	return source$.pipe(
		concatMap((res: AjaxResponse<{ items: IRepository[] }>) => res.response.items),
		// concatAll(),
		map(crateCard),
		bufferCount(3),
		map(createRow),
		toArray(),
		map((htmlStrs: string[]) => htmlStrs.join(' ')),
		// reduce((resultStr: string, htmlStrs: string[]) => {
		// 	return resultStr + createRow(htmlStrs);
		// }, ''),
		map((htmlStr: string) => htmlStr.trim().replace(/\s+(<)/g, '<')),
		// catchError(() => {
		// 	return of([]);
		// }),
		// tap(() => {
		// 	// detectChanges
		// }),
		catchError(() => {
			return EMPTY;
		}),
	);
}
