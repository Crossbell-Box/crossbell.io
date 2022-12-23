import React from "react";

export function usePreloadImgs(imgs: string[]) {
	React.useEffect(() => {
		imgs.forEach((img) => {
			const image = new Image();
			image.src = img;
		});
	}, [imgs]);
}
