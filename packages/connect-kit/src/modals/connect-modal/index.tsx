import React from "react";

import { waitUntilModalClosed } from "../../utils";
import { createLazyModal } from "../../components";

import { useConnectModal } from "./stores";

export { useConnectModal };

export function showConnectModal() {
	useConnectModal.getState().show();
	return waitUntilModalClosed(useConnectModal);
}

export const ConnectModal = createLazyModal(
	useConnectModal,
	React.lazy(() => import("./lazy")),
);
