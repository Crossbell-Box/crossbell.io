import React from "react";
import { useRefCallback } from "@crossbell/util-hooks";

export type UseResizerObserverOptions<T extends HTMLElement> = {
	onResize: (elm: T) => void;
	ref?: React.RefObject<T | null>;
};

export function useResizerObserver<T extends HTMLElement>(
	options: UseResizerObserverOptions<T>,
) {
	const cacheRef = React.useRef<{ elm: T; observer: ResizeObserver } | null>(
		null,
	);

	const onResize = useRefCallback(() => {
		if (cacheRef.current?.elm) {
			options.onResize(cacheRef.current?.elm);
		}
	});

	const dispose = useRefCallback(() => {
		cacheRef.current?.observer.disconnect();
		cacheRef.current = null;
	});

	React.useImperativeHandle(options?.ref, () => cacheRef.current?.elm ?? null);

	return useRefCallback((elm: T | null) => {
		if (cacheRef.current?.elm === elm) return;

		if (elm) {
			dispose();

			const observer = new window.ResizeObserver(onResize);
			observer.observe(elm);
			cacheRef.current = { elm, observer };
		}
	});
}
