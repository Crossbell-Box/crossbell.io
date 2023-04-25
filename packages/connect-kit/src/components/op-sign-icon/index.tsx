import React from "react";
import { useRefCallback } from "@crossbell/util-hooks";
import { useIsOpSignEnabled } from "@crossbell/react-account";

import { useOpSignSettingsModal } from "../../modals/op-sign-settings-modal";
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
	const isOpSignEnabled = useIsOpSignEnabled({ characterId });

	const showSettingModal = useOpSignSettingsModal((s) => s.show);
	const handleClick = useRefCallback((event: React.MouseEvent) => {
		if (openSettingsOnClick && characterId) {
			event.stopPropagation();
			showSettingModal({ characterId });
		}
	});

	return <Icon isActive={isOpSignEnabled} onClick={handleClick} {...props} />;
}
