import React from "react";

import { createLazyModal } from "../../components";

import { useOpSignSettingsModal } from "./stores";

export { useOpSignSettingsModal };

export const OpSignSettingsModal = createLazyModal(
	useOpSignSettingsModal,
	React.lazy(() => import("./lazy")),
);
