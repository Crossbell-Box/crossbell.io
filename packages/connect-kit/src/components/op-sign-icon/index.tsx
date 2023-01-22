import React from "react";

import { useAccountState, useToggleOpSignOperator } from "../../hooks";

import { Icon } from "./icon";

export type OpSignIconProps = React.SVGAttributes<SVGSVGElement> & {
	characterId: number | null | undefined;
};

export function OpSignIcon({ characterId, ...props }: OpSignIconProps) {
	const isSignedIn = useAccountState((s) => !!s.wallet?.siwe);
	const [{ hasPermissions }] = useToggleOpSignOperator({ characterId });

	return <Icon isActive={isSignedIn && hasPermissions} {...props} />;
}
