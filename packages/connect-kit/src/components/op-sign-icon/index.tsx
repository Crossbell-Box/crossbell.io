import React from "react";

import { useRefCallback } from "@crossbell/util-hooks";

import { useOpSignSettingsModal } from "../../modals/op-sign-settings-modal";
import { useToggleOpSignOperator, useIsWalletSignedIn } from "../../hooks";
import { Icon } from "./icon";

export type OpSignIconProps = React.SVGAttributes<SVGSVGElement> & {
	characterId: number | null | undefined;
	openSettingsOnClick?: boolean;
};

export { Icon as DumbOpSignIcon };

export function OpSignIcon({
	characterId,
	openSettingsOnClick,
	...props
}: OpSignIconProps) {
	const isSignedIn = useIsWalletSignedIn();
	const [{ hasPermissions }] = useToggleOpSignOperator({ characterId });

	const showSettingModal = useOpSignSettingsModal((s) => s.show);
	const handleClick = useRefCallback((event: React.MouseEvent) => {
		if (openSettingsOnClick && characterId) {
			event.stopPropagation();
			showSettingModal(characterId);
		}
	});

	return (
		<Icon
			isActive={isSignedIn && hasPermissions}
			onClick={handleClick}
			{...props}
		/>
	);
}
