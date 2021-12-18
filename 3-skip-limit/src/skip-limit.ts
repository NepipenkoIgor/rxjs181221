import { Observable, Subscriber } from 'rxjs';

class SkipLimitSubscriber<T> extends Subscriber<T> {
	private interval = 1;

	private count: number = 1;

	public constructor(subscriber: Subscriber<T>, private skip: number, private limit: number) {
		super(subscriber);
	}

	public override next(value?: any) {
		const borderLeft = this.interval * (this.skip + this.limit) - this.limit;
		const borderRight = borderLeft + this.limit;
		if (borderLeft < this.count && this.count <= borderRight) {
			super.next(value);
			this.count++;
			if (borderRight < this.count) {
				this.interval++;
			}
			return;
		}
		this.count++;
	}
}

export const skipLimit = <T>(skip: number, limit: number) => {
	return (source: Observable<T>) => {
		return new Observable((subscriber: Subscriber<T>) => {
			const sub = source.subscribe(new SkipLimitSubscriber<T>(subscriber, skip, limit));
			return () => {
				sub.unsubscribe();
			};
		});
	};
};
