import deepMerge_ from "@fastify/deepmerge";

export type DeepMergeFn = ReturnType<typeof deepMerge_>;

export const deepMerge: DeepMergeFn = deepMerge_({
	mergeArray: (options) => {
		const clone = options.clone;
		return function (_target, source) {
			return clone(source);
		};
	},
});
