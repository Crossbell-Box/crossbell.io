import { useDynamicScenesModal } from "../../components";
import { SelectOptions } from "../../scenes/upgrade-account";

export function showUpgradeAccountModal() {
	useDynamicScenesModal.getState().show({
		kind: "select-upgrade-account-options",
		Component: SelectOptions,
	});
}
