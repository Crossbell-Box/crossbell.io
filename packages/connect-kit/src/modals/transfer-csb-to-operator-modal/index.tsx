import React from "react";

import { createLazyModal } from "../../components";

import { useTransferCSBToOperatorModal } from "./stores";

export { useTransferCSBToOperatorModal };

export const TransferCSBToOperatorModal = createLazyModal(
	useTransferCSBToOperatorModal,
	React.lazy(() => import("./lazy")),
);
