import React from "react";

export function usePreloadImgs(imgs: string[]) {
	React.useEffect(() => {
		if ("requestIdleCallback" in window) {
			const handle = requestIdleCallback(() => {
				imgs.forEach((img) => {
					const image = new Image();
					image.src = img;
				});
			});

			return () => cancelIdleCallback(handle);
		}
	}, [imgs]);
}
