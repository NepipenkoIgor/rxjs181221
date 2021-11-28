// eslint-disable-next-line @typescript-eslint/no-unused-vars
const animationFn = (percentage: number) => {
	return Math.sin(-13 * (percentage + 1) * Math.PI * 2) * 2 ** (-10 * percentage) + 1;
};
