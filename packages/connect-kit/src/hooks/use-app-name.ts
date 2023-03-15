import { useConnect } from "wagmi";
import React from "react";

import { useXSettingsConfig } from "../x-settings-config";

export function useAppName() {
	const { appName } = useXSettingsConfig();
	const { connectors } = useConnect();

	return React.useMemo(() => {
		return (
			appName ??
			connectors.find(({ options }) => !!options.appName)?.options.appName ??
			"Current app"
		);
	}, [connectors]);
}
