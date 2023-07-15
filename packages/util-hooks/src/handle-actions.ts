export type ActionHandler = <T>(params: {
	action: () => T;
	path: string[];
}) => Promise<T>;

type RawAction = (...args: any[]) => any;

export function handleActions<T extends object>(
	obj: T,
	callback: ActionHandler,
): T {
	function createProxy<T extends object>(target: T, path: string[]): T {
		return new Proxy<T>(target, {
			get: (target, prop) => {
				const newPath = path.concat([String(prop)]);
				const key = prop as keyof typeof target;
				const value = target[key];

				if (typeof value === "function") {
					return function (...args: any[]) {
						return callback({
							action: () => (target[key] as RawAction)(...args),
							path: newPath,
						});
					};
				} else if (typeof value === "object" && value !== null) {
					return createProxy(value, newPath);
				} else {
					return value;
				}
			},
		});
	}

	return createProxy<T>(obj, []);
}
