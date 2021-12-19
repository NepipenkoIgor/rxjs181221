import { map, Observable, switchMap, takeUntil } from 'rxjs';

export function dragAndDrop(
	source1$: Observable<MouseEvent>,
	source2$: Observable<MouseEvent>,
	source3$: Observable<MouseEvent>,
): Observable<{ left: number; top: number }> {
	return source1$.pipe(
		switchMap((start) => {
			start.preventDefault();
			return source2$.pipe(
				map((move) => {
					move.preventDefault();
					return {
						left: move.clientX - start.offsetX,
						top: move.clientY - start.offsetY,
					};
				}),
				takeUntil(source3$),
			);
		}),
	);
}
