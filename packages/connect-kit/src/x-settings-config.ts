import React from "react";

export type XSettingsConfig = {
	otherApps: {
		title: string;
		icon: React.ReactNode;
		color: string;
		url: string;
	}[];

	sentry?: {
		dsn: string;
		setup: () => void;
		close: () => void;
	};
};

const defaultConfig: XSettingsConfig = {
	otherApps: [],
};

export const XSettingsConfigContext =
	React.createContext<Partial<XSettingsConfig> | null>(null);

export function useXSettingsConfig(): XSettingsConfig {
	const config = React.useContext(XSettingsConfigContext);

	return React.useMemo(() => ({ ...defaultConfig, ...config }), [config]);
}
