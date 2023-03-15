import React from "react";
import { Dialog } from "@crossbell/ui";

import { useSentryPrivacyModal } from "./stores";
import { Privacy } from "./privacy";

export { useSentryPrivacyModal };

export function SentryPrivacyModal() {
	const { isActive } = useSentryPrivacyModal();

	return (
		<Dialog isActive={isActive}>
			<Privacy />
		</Dialog>
	);
}
