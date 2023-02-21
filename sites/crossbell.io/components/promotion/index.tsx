import React from "react";
import {
	useAccountState,
	useOPSignOperatorHasPermissions,
} from "@crossbell/connect-kit";

import { OPSignPromotion } from "./op-sign";
import { XSyncPromotion } from "./x-sync";

export function Promotion() {
	const [isEmailUser, isAbleToSignIn, characterId] = useAccountState((s) => [
		!!s.email,
		!s.wallet?.siwe,
		s.wallet?.characterId,
	]);

	const hasPermissions = useOPSignOperatorHasPermissions({ characterId });

	if (!isEmailUser && (isAbleToSignIn || !hasPermissions)) {
		return <OPSignPromotion />;
	} else {
		return <XSyncPromotion />;
	}
}
