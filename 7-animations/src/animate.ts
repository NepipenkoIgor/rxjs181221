// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { animationFrameScheduler, defer, interval, map, takeWhile, tap } from 'rxjs';

const animationFn = (percentage: number) => {
	return Math.sin(-13 * (percentage + 1) * Math.PI * 2) * 2 ** (-10 * percentage) + 1;
};

function elapsed(scheduler = animationFrameScheduler) {
	return defer(() => {
		const start = scheduler.now();
		return interval(0, scheduler).pipe(map(() => scheduler.now() - start));
	});
}

function duration(ms: number, scheduler = animationFrameScheduler) {
	return elapsed(scheduler).pipe(
		map((time) => time / ms),
		takeWhile((percentage) => percentage <= 1),
	);
}

function distance(px: number) {
	return (percentage: number) => percentage * px;
}

export function animationDown(element: HTMLElement) {
	return duration(20000).pipe(
		map(animationFn),
		map(distance(100)),
		tap((frame) => {
			element.style.transform = `translate3d(0,${frame}px,0)`;
		}),
	);
}
