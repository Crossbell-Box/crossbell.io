import React from "react";
import { NoEnoughCSBKind } from "@crossbell/react-account";
import { Dialog } from "@crossbell/ui";

import { createLazyModal } from "../../components";
import { waitUntilModalClosed } from "../../utils";
import { useNoEnoughCSBModal } from "./stores";
import styles from "./index.module.css";

export { useNoEnoughCSBModal };

export function showNoEnoughCSBModal(kind: NoEnoughCSBKind) {
	useNoEnoughCSBModal.getState().show(kind);
	return waitUntilModalClosed(useNoEnoughCSBModal);
}

export const NoEnoughCSBModal = createLazyModal(
	useNoEnoughCSBModal,
	React.lazy(() => import("./lazy")),
	{
		Modal: Dialog,
		loadingClassName: styles.container,
	}
);
