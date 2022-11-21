import React from "react";

export function useRefCallback<T extends unknown[], R = void>(
	callback: (...params: T) => R
) {
	const callbackRef = React.useRef(callback);

	callbackRef.current = callback;

	return React.useCallback(
		(...params: T) => callbackRef.current(...params),
		[callbackRef]
	);
}
