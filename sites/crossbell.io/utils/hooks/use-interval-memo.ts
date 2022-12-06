import React, { DependencyList } from "react";

export function useIntervalMemo<T>(
	factory: () => T,
	ms: number = 1000,
	deps: DependencyList = []
): T {
	const [times, setTimes] = React.useState(0);

	React.useEffect(() => {
		const interval = setInterval(() => setTimes((t) => t + 1), ms);
		return () => clearInterval(interval);
	}, [ms]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	return React.useMemo(factory, [times, ...deps]);
}
