import React from "react";

import { createLazyModal } from "../../components";

import { useCsbDetailModal } from "./stores";

export { useCsbDetailModal };

export const CsbDetailModal = createLazyModal(
	useCsbDetailModal,
	React.lazy(() => import("./lazy"))
);
