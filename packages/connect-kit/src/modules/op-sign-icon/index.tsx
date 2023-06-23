import React from "react";
import { useRefCallback } from "@crossbell/util-hooks";
import { useIsOpSignEnabled } from "@crossbell/react-account";

import { DumbOpSignIcon } from "../../components";
import { useOpSignSettingsModal } from "../../modals/op-sign-settings-modal";

export type OpSignIconProps = React.SVGAttributes<SVGSVGElement> & {
	characterId: number | null | undefined;
	openSettingsOnClick?: boolean;
};

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

	return (
		<DumbOpSignIcon
			isActive={isOpSignEnabled}
			onClick={handleClick}
			{...props}
		/>
	);
}
