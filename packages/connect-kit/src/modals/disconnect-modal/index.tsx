import React from "react";

import { createLazyModal } from "../../components";
import { useDisconnectModal } from "./stores";

export { useDisconnectModal };

export const DisconnectModal = createLazyModal(
	useDisconnectModal,
	React.lazy(() => import("./lazy")),
);
