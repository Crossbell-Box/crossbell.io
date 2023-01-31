import React from "react";

import { TransferCSB as Main } from "../../../../components";
import { OP_SIGN_OPERATOR_ADDRESS } from "../../../../hooks/operator-sign/consts";

import { Header } from "../../components";

import styles from "./index.module.css";

export function Transfer() {
	return (
		<div className={styles.container}>
			<Header title="$CSB Transfer" />
			<Main toAddress={OP_SIGN_OPERATOR_ADDRESS} />
		</div>
	);
}
