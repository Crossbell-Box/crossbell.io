import React from "react";
import { Dialog } from "@crossbell/ui";

import { useSentryPrivacyModal } from "./stores";
import { createLazyModal } from "../../components";
import styles from "./privacy.module.css";

export { useSentryPrivacyModal };

export const SentryPrivacyModal = createLazyModal(
	useSentryPrivacyModal,
	React.lazy(() => import("./privacy")),
	{
		Modal: Dialog,
		loadingClassName: styles.container,
	},
);
