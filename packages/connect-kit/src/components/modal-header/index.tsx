import React from "react";
import { BackIcon, CloseIcon, useBaseModalContext } from "@crossbell/ui";
import classNames from "classnames";

import { IconBtn } from "../icon-btn";
import styles from "./index.module.css";

export type ModalHeaderProps = {
	title?: React.ReactNode;
	leftNode?: React.ReactNode;
	rightNode?: React.ReactNode;
	isAbleToGoBack?: boolean;
	isAbleToClose?: boolean;
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
	isAbleToClose,
}: ModalHeaderProps) {
	const modalContext = useBaseModalContext();
	const canClose = modalContext.canClose && isAbleToClose;

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
							<IconBtn
								disabled={!canClose}
								className={classNames(!canClose && styles.hidden)}
								onClick={onClose ?? modalContext.onClose}
							>
								<CloseIcon />
							</IconBtn>
						))}
				</div>
			</div>
		</div>
	);
}
