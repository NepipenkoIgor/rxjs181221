import { filter, fromEvent, map, Observable, zip, merge } from 'rxjs';

function getX(source$: Observable<MouseEvent | TouchEvent>): Observable<number> {
	return source$.pipe(
		map((e: MouseEvent | TouchEvent) => {
			if (e instanceof MouseEvent) {
				return e.clientX;
			}
			return e.changedTouches[0]!.clientX;
		}),
	);
}

const touchStart$ = getX(
	merge(
		fromEvent<MouseEvent>(document, 'mousedown'),
		fromEvent<TouchEvent>(document, 'touchstart'),
	),
);
const touchEnd$ = getX(
	merge(fromEvent<MouseEvent>(document, 'mouseup'), fromEvent<TouchEvent>(document, 'touchend')),
);

function swipe(source1$: Observable<number>, source2$: Observable<number>) {
	return zip(source1$, source2$).pipe(
		map(([startX, endX]) => startX - endX),
		filter((value) => value !== 0),
	);
}

export const swipe$ = swipe(touchStart$, touchEnd$);
