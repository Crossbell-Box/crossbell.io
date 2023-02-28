import { useDynamicScenesModal } from "../../components";

import { MainSetting } from "./scenes/main-settings";

export function showXSettingsModal() {
	useDynamicScenesModal.getState().show({
		kind: "x-settings-main",
		Component: MainSetting,
	});
}
