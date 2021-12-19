import { TestScheduler } from 'rxjs/testing';
import { map } from 'rxjs';

describe('Swipe', () => {
	let testScheduler: TestScheduler;
	beforeEach(() => {
		testScheduler = new TestScheduler((actual, expexted) => {
			expect(actual).toEqual(expexted);
		});
	});
	it('Map operator', () => {
		testScheduler.run((helpers) => {
			const { cold, expectObservable } = helpers;
			const s1$ = cold('-a--b--c---|', { a: 2, b: 3, c: 4 });
			const md = '-a--b--c---|';
			expectObservable(s1$.pipe(map((x) => x * 2))).toBe(md, {
				a: 4,
				b: 6,
				c: 8,
			});
		});
	});
});
