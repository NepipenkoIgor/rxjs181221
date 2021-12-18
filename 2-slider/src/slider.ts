import { combineLatest, fromEvent, map, Observable, startWith, tap, withLatestFrom } from 'rxjs';

const qualitySlider = $('#quality').slider();
const ratingSlider = $('#rating').slider();
const actualSlider = $('#actual').slider();

interface IDrawElement {
	element: HTMLElement;
	value: number;
}

function getValue(
	source$: Observable<any>,
	initialValue: IDrawElement,
	drawCb: (options: IDrawElement) => void,
): Observable<number> {
	return source$.pipe(
		map(({ delegateTarget: previousElementSibling, value: { newValue } }) => {
			return {
				element: previousElementSibling,
				value: newValue * 10,
			};
		}),
		startWith(initialValue),
		tap(drawCb),
		map(({ value }) => value),
	);
}

function drawSlider({ element, value }: IDrawElement) {
	const track = element.parentElement!.querySelector('.slider-track');
	track?.classList.remove('bad', 'warn', 'good');
	if (value < 40) {
		track?.classList.add('bad');
		return;
	}
	if (value >= 40 && value <= 70) {
		track?.classList.add('warn');
		return;
	}
	track?.classList.add('good');
}

const quality$ = getValue(
	fromEvent(qualitySlider, 'change'),
	{
		element: qualitySlider.parent().children(':first-child')[0]!,
		value: 50,
	},
	drawSlider,
);
const rating$ = getValue(
	fromEvent(ratingSlider, 'change'),
	{
		element: ratingSlider.parent().children(':first-child')[0]!,
		value: 50,
	},
	drawSlider,
);
const actual$ = getValue(
	fromEvent(actualSlider, 'change'),
	{
		element: actualSlider.parent().children(':first-child')[0]!,
		value: 50,
	},
	drawSlider,
);

function sliderGroupSequence(...sources: Observable<number>[]) {
	return combineLatest(sources).pipe(
		map((values: number[]) => {
			const total = values.reduce((sum, v) => {
				const res = sum + v;
				return res;
			});
			return Math.round(total / values.length);
		}),
		tap((v) => {
			console.log(v);
		}),
	);
}

const sliderGroupSequence$ = sliderGroupSequence(quality$, rating$, actual$);

// export const sliderResultSequence$ = combineLatest([
// 	fromEvent(document.querySelector('#send-result')!, 'click'),
// 	sliderGroupSequence$,
// ]).pipe(
export const sliderResultSequence$ = fromEvent(
	document.querySelector('#send-result')!,
	'click',
).pipe(
	withLatestFrom(sliderGroupSequence$),
	map(([, value]) => {
		return value;
	}),
);
