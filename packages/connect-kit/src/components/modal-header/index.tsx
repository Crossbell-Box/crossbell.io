import React from "react";
import { BackIcon, CloseIcon } from "@crossbell/ui";

import { IconBtn } from "../icon-btn";
import styles from "./index.module.css";

export type ModalHeaderProps = {
	title: React.ReactNode;
	leftNode?: React.ReactNode;
	rightNode?: React.ReactNode;
	isAbleToGoBack?: boolean;
	onGoBack?: () => void;
	onClose?: () => void;
};

export function ModalHeader({
	title,
	leftNode,
	rightNode,
	onGoBack,
	isAbleToGoBack,
	onClose,
}: ModalHeaderProps) {
	return (
		<div data-animation="fade-in" className={styles.container}>
			<div className={styles.main}>
				<div>
					{leftNode ??
						(isAbleToGoBack && onGoBack && (
							<IconBtn onClick={onGoBack}>
								<BackIcon className={styles.backIcon} />
							</IconBtn>
						))}
				</div>
				<div className={styles.title}>{title}</div>
				<div>
					{rightNode ??
						(onClose && (
							<IconBtn onClick={onClose}>
								<CloseIcon />
							</IconBtn>
						))}
				</div>
			</div>
		</div>
	);
}
