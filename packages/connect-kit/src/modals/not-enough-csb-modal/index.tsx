import React from "react";
import { useWeb2Url } from "@crossbell/ui";

import { ModalHeader, BaseModal } from "../../components";
import { IMAGES } from "../../utils";

import styles from "./index.module.css";
import { useNotEnoughCSBModal } from "./stores";

export { useNotEnoughCSBModal };

export function NotEnoughCSBModal() {
	const { isActive, hide, msg } = useNotEnoughCSBModal();
	const imgUrl = useWeb2Url(IMAGES.claimCSBImg);

	return (
		<BaseModal isActive={isActive} onClose={hide}>
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
		</BaseModal>
	);
}
