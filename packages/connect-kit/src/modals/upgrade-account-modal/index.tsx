import { SelectOptions } from "../../scenes/for-upgrade-account";
import { createDynamicScenesModal } from "../../components";

export const {
	useModal: useUpgradeEmailAccountModal,
	showModal: showUpgradeEmailAccountModal,
} = createDynamicScenesModal("upgrade-account", {
	kind: "select-upgrade-account-options",
	Component: SelectOptions,
});
