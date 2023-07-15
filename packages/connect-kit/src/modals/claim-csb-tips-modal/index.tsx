import React from "react";

import { createLazyModal } from "../../components";
import { waitUntilModalClosed } from "../../utils";

import { useClaimCSBTipsModal } from "./stores";

export { useClaimCSBTipsModal };

export function showClaimCSBTipsModal(msg: string) {
	useClaimCSBTipsModal.getState().show(msg);
	return waitUntilModalClosed(useClaimCSBTipsModal);
}

export const ClaimCSBTipsModal = createLazyModal(
	useClaimCSBTipsModal,
	React.lazy(() => import("./lazy")),
);
