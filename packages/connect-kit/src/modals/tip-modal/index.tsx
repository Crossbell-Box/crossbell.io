import React from "react";

import { createLazyModal } from "../../components";
import { Modal } from "./components";

import { useTipModal } from "./stores";

export { useTipModal };

export const TipModal = createLazyModal(
	useTipModal,
	React.lazy(() => import("./lazy")),
	{ Modal },
);
