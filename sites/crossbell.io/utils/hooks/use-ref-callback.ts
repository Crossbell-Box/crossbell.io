import React from "react";

type Callback<T extends unknown[], R> = (...params: T) => R;

export function useRefCallback<T extends unknown[], R = void>(
	callback: Callback<T, R>
): Callback<T, R>;

export function useRefCallback<T extends unknown[], R = void>(
	callback?: Callback<T, R>
): Callback<T, R | undefined>;

export function useRefCallback<T extends unknown[], R = void>(
	callback?: (...params: T) => R
) {
	const callbackRef = React.useRef(callback);

	callbackRef.current = callback;

	return React.useCallback(
		(...params: T) => callbackRef.current?.(...params),
		[callbackRef]
	);
}
