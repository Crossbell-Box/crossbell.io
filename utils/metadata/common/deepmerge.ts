import deepMerge_ from "@fastify/deepmerge";

export const deepMerge = deepMerge_({
	mergeArray: (options) => {
		const clone = options.clone;
		return function (target, source) {
			return clone(source);
		};
	},
});
