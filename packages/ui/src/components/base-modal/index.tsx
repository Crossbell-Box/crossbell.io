import React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import { useIsMounted } from "@crossbell/util-hooks";
import { RemoveScroll } from "react-remove-scroll";

import styles from "./index.module.css";

export type ModalProps = {
	isActive?: boolean;
	children?: React.ReactNode;
	onClickBg?: () => void;
	afterClose?: () => void;
	className?: string;
};

export function BaseModal({
	children,
	isActive = false,
	onClickBg,
	afterClose,
	className,
}: ModalProps) {
	const [needMount, setNeedMount] = React.useState(isActive);

	if (!needMount && isActive) {
		setNeedMount(true);
	}

	const mounted = useIsMounted();

	return mounted && needMount
		? ReactDOM.createPortal(
				<div
					className={styles.layout}
					data-is-active={isActive}
					onTransitionEnd={() => {
						if (!isActive) {
							setNeedMount(false);
							afterClose?.();
						}
					}}
				>
					<RemoveScroll className={classNames(styles.content, className)}>
						{children}
					</RemoveScroll>
					<div className={styles.bg} onClick={onClickBg} />
				</div>,
				document.body
		  )
		: null;
}
