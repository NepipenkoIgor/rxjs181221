import {
	fromEvent,
	map,
	combineLatest,
	debounceTime,
	switchMap,
	EMPTY,
	of,
	withLatestFrom,
} from 'rxjs';
import { userService } from './user.service';

export class FormComponent {
	private input!: HTMLInputElement;

	private button!: HTMLButtonElement;

	private valueSequence$;

	public constructor(public formContainer: HTMLFormElement) {
		this.input = this.formContainer.querySelector('input') as HTMLInputElement;
		this.button = this.formContainer.querySelector('button') as HTMLButtonElement;
		this.valueSequence$ = combineLatest([
			fromEvent<InputEvent>(this.input, 'input').pipe(
				map<InputEvent, string>((e: Event) => {
					return (e.target as HTMLInputElement).value;
				}),
			),
			userService.uniqueNameSequence$,
		]).pipe(
			debounceTime(300),
			switchMap(([value, names]: [string, string[]]) => {
				const isNotValid = names.find((name) => name === value);
				if (isNotValid) {
					this.input.classList.add('error');
					this.button.disabled = true;
					return EMPTY;
				}
				this.input.classList.remove('error');
				this.button.disabled = false;
				return of(value);
			}),
		);

		fromEvent(this.button, 'click')
			.pipe(
				withLatestFrom(this.valueSequence$),
				map(([, value]) => value),
			)
			.subscribe((v) => {
				console.log(v);
			});
	}
}
