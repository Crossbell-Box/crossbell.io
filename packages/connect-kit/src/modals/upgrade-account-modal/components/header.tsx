import React from "react";
import { Button } from "@mantine/core";
import { BackIcon, CloseIcon } from "@crossbell/ui";

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
				leftNode ?? (
					<Button
						className={styles.backBtn}
						variant="subtle"
						color="gray"
						compact
						onClick={goBack}
						disabled={isAbleToGoBack}
					>
						<BackIcon className={styles.backIcon} />
					</Button>
				)
			}
			rightNode={
				rightNode ?? (
					<Button
						className={styles.closeBtn}
						variant="subtle"
						color="gray"
						compact
						onClick={hide}
					>
						<CloseIcon />
					</Button>
				)
			}
		/>
	);
}
