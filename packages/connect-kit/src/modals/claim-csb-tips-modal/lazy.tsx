import React from "react";
import { useWeb2Url, DynamicContainerContent } from "@crossbell/ui";

import { ModalHeader } from "../../components";
import { IMAGES } from "../../utils";

import styles from "./index.module.css";
import { useClaimCSBTipsModal } from "./stores";

export default function ClaimCSBTipsModal() {
	const { hide, msg } = useClaimCSBTipsModal();
	const imgUrl = useWeb2Url(IMAGES.claimCSBImg);

	return (
		<DynamicContainerContent id="ClaimCSBTipsModal">
			<div className={styles.container}>
				<ModalHeader title="Claim" onClose={hide} />

				<div className={styles.main}>
					<div className={styles.tipsContainer}>
						<div className={styles.tipsLayout}>
							<img className={styles.tipsImg} src={imgUrl} />
						</div>
					</div>

					<p className={styles.msg}>{msg}</p>
				</div>
			</div>
		</DynamicContainerContent>
	);
}
