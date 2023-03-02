import { SelectOptions } from "../../scenes/upgrade-account";
import { createDynamicScenesModal } from "../../components";

export const {
	useModal: useUpgradeAccountModal,
	showModal: showUpgradeAccountModal,
} = createDynamicScenesModal("upgrade-account", {
	kind: "select-upgrade-account-options",
	Component: SelectOptions,
});
