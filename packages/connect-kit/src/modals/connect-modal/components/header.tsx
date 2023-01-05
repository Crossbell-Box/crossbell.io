import React from "react";
import { Text, Button } from "@mantine/core";

import { ModalHeaderProps, ModalHeader } from "../../../components";

import { useModalStore, useScenesStore } from "../stores";
import styles from "./header.module.css";

export type HeaderProps = ModalHeaderProps;

export function Header({ title, leftNode, rightNode }: HeaderProps) {
	const isAbleToGoBack = useScenesStore(
		({ computed }) => computed.isAbleToGoBack
	);
	const goBack = useScenesStore(({ goBack }) => goBack);
	const { hide } = useModalStore();

	return (
		<ModalHeader
			title={title}
			leftNode={
				leftNode || (
					<Button
						className={styles.btn}
						variant="subtle"
						color="gray"
						compact
						onClick={goBack}
						disabled={isAbleToGoBack}
					>
						<Text className={styles.backIcon} />
					</Button>
				)
			}
			rightNode={
				rightNode || (
					<Button
						className={styles.btn}
						variant="subtle"
						color="gray"
						compact
						onClick={hide}
					>
						<Text className={styles.closeIcon} />
					</Button>
				)
			}
		/>
	);
}
