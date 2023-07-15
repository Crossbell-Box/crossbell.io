import React from "react";

import { useRefCallback } from "./use-ref-callback";

const NOOP = { run() {} };

export type UseDebouncedActionSequenceConfig = {
	delay?: number;
	onError: (error: unknown) => void;
};

export type UseDebouncedActionSequenceConfigAddOptions = {
	onSettled?: () => void;
};

export function useDebouncedActionSequence({
	delay = 1000,
	onError,
}: UseDebouncedActionSequenceConfig) {
	const actionIdRef = React.useRef(0);
	const [action, _setAction] = React.useState(NOOP);

	React.useEffect(() => {
		const timeout = window.setTimeout(action.run, delay);
		return () => window.clearTimeout(timeout);
	}, [action]);

	const add = useRefCallback(
		(
			action: () => Promise<unknown>,
			options?: UseDebouncedActionSequenceConfigAddOptions,
		) => {
			_setAction({
				async run() {
					actionIdRef.current += 1;
					const mutationId = actionIdRef.current;

					try {
						await action();
					} catch (e) {
						onError?.(e);
					} finally {
						if (mutationId === actionIdRef.current) {
							options?.onSettled?.();
						}
					}
				},
			});
		},
	);

	const clear = useRefCallback(() => _setAction(NOOP));

	return { add, clear };
}
