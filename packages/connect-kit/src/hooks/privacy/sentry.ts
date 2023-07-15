import { useRefCallback } from "@crossbell/util-hooks";
import {
	useAccountCharacter,
	useCharacterAttribute,
	UseCharacterAttributeOptions,
} from "@crossbell/react-account";

import { useXSettingsConfig } from "../../x-settings-config";

export function useSentryStatus(options?: UseCharacterAttributeOptions) {
	const { sentry } = useXSettingsConfig();
	const character = useAccountCharacter();
	const { data, update, isLoading } = useCharacterAttribute(
		{
			characterId: character?.characterId,
			key: sentry?.dsn,
		},
		options,
	);
	const isEnabled = !!data;

	const enable = useRefCallback(() => update(true));
	const disable = useRefCallback(() => update(null));
	const toggle = useRefCallback(() => (isEnabled ? disable() : enable()));

	return { isEnabled, isLoading, toggle, disable, enable };
}
