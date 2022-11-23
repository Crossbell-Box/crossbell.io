import React from "react";

export function useInitiateConnect(callback: () => void) {
	const isFirstTimeConnectRef = React.useRef(true);

	React.useEffect(() => {
		if (isFirstTimeConnectRef.current) {
			callback();
			isFirstTimeConnectRef.current = false;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
}
