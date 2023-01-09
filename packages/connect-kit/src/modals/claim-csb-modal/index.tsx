import React from "react";
import { Button } from "@mantine/core";
import { CloseIcon } from "@crossbell/ui";

import { ModalHeader, BaseModal } from "../../components";

import styles from "./index.module.css";
import { useClaimCSBModal } from "./stores";
import { useWeb2Url } from "../../utils";

export { useClaimCSBModal };

export function ClaimCSBModal() {
	const { isActive, hide, msg } = useClaimCSBModal();
	const imgUrl = useWeb2Url(
		"ipfs://bafkreihjx5itbdah5rlo5qs3afwnmangtwnwsz3fnnfpgxyyskskoo6ote"
	);

	return (
		<BaseModal isActive={isActive} onClose={hide}>
			<div className={styles.container}>
				<ModalHeader
					title="Claim"
					rightNode={
						<Button
							className={styles.closeBtn}
							variant="subtle"
							color="gray"
							compact
							onClick={hide}
						>
							<CloseIcon />
						</Button>
					}
				/>

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
