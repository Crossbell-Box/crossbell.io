import { SelectOptions } from "../../scenes/upgrade-account";
import { createDynamicScenesModal } from "../../components";

export const {
	/**
	 * @deprecated use `useUpgradeEmailAccountModal` instead.
	 */
	useModal: useUpgradeAccountModal,
	/**
	 * @deprecated use `showUpgradeEmailAccountModal` instead.
	 */
	showModal: showUpgradeAccountModal,
} = createDynamicScenesModal("upgrade-account", {
	kind: "select-upgrade-account-options",
	Component: SelectOptions,
});

export {
	useUpgradeAccountModal as useUpgradeEmailAccountModal,
	showUpgradeAccountModal as showUpgradeEmailAccountModal,
};
