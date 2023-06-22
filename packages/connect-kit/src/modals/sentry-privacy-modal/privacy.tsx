import React from "react";
import { LoadingOverlay, DynamicContainerContent } from "@crossbell/ui";

import { ModalHeader, OptionList, OptionListItem } from "../../components";
import { useAppName, useSentryStatus } from "../../hooks";

import { useSentryPrivacyModal } from "./stores";
import styles from "./privacy.module.css";

export default function Privacy() {
	const { hide } = useSentryPrivacyModal();
	const { enable, isEnabled, isLoading } = useSentryStatus({ onSuccess: hide });
	const appName = useAppName();

	return (
		<DynamicContainerContent id="privacy">
			<div className={styles.container}>
				<LoadingOverlay visible={isLoading} />
				<ModalHeader title="Your Privacy" onClose={hide} />

				<div className={styles.main}>
					<p className={styles.tips}>
						By clicking "Accept Sentry Monitoring", you agree that
						{` ${appName} `}
						can use Sentry to collect necessary information to improve your
						experience in accordance with Sentry's [
						<a href="https://sentry.io/legal/dpa/" target="_blank">
							Data Processing Addendum
						</a>
						].
					</p>

					<OptionList>
						<OptionListItem
							color="yellow"
							className={styles.item}
							onClick={isEnabled ? hide : enable}
						>
							Accept Sentry Monitoring
						</OptionListItem>
						<OptionListItem color="gray" className={styles.item} onClick={hide}>
							Skip
						</OptionListItem>
					</OptionList>
				</div>
			</div>
		</DynamicContainerContent>
	);
}
