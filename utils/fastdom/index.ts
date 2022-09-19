import fastdom from "fastdom";

type Callback = () => void;

export function disposableFastdom() {
	const tasks: Callback[] = [];

	return {
		measure(fn: Callback) {
			tasks.push(fastdom.measure(fn));
		},
		mutate(fn: Callback) {
			tasks.push(fastdom.mutate(fn));
		},
		dispose() {
			tasks.forEach((task) => fastdom.clear(task));
		},
	};
}
