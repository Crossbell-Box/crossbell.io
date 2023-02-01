import React from "react";
import { useRefCallback } from "@crossbell/util-hooks";

import { TransferCSB as Main } from "../../../../components";
import { OP_SIGN_OPERATOR_ADDRESS } from "../../../../hooks/operator-sign/consts";

import { Header } from "../../components";
import { SceneKind } from "../../types";
import { useScenesStore } from "../../stores";

import styles from "./index.module.css";

export function Transfer() {
	const goTo = useScenesStore((s) => s.goTo);
	const onSuccess = useRefCallback(() => {
		goTo({ kind: SceneKind.transferSuccess });
	});

	return (
		<div className={styles.container}>
			<Header title="$CSB Transfer" />
			<Main toAddress={OP_SIGN_OPERATOR_ADDRESS} onSuccess={onSuccess} />
		</div>
	);
}
