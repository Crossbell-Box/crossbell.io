import React from "react";

import { createLazyModal } from "../../components";

import { useWalletClaimCSBModal } from "./stores";

export { useWalletClaimCSBModal };

export const WalletClaimCSBModal = createLazyModal(
	useWalletClaimCSBModal,
	React.lazy(() => import("./lazy")),
);
