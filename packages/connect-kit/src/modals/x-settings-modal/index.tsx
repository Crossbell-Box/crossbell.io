import { MainSetting } from "./scenes/main-settings";
import { createDynamicScenesModal } from "../../components";

export const { useModal: useXSettingsModal, showModal: showXSettingsModal } =
	createDynamicScenesModal("x-settings", {
		kind: "x-settings-main",
		Component: MainSetting,
	});
