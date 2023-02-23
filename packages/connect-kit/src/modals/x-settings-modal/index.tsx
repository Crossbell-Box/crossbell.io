import { useDynamicScenesModal } from "../../components";

import { MainSetting } from "./scenes/main-settings";

export function useXSettingsModal() {
	return useDynamicScenesModal({
		kind: "x-settings-main",
		Component: MainSetting,
	});
}
