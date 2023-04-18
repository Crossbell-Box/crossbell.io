import { KeyframesFn } from "scrollex";

export const commonKeyframes = {
	container: ({ section }) => ({
		[section.topAt("container-bottom")]: {
			translateY: 0,
		},
		[section.bottomAt("container-top")]: {
			translateY: -section.height / 4,
		},
	}),
} satisfies Record<string, KeyframesFn>;
