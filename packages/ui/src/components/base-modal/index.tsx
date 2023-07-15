import React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import { RemoveScroll } from "react-remove-scroll";
import { useIsMounted, useRefCallback } from "@crossbell/util-hooks";

import styles from "./index.module.css";
import { BaseModalContext } from "./context";

export type ModalProps = {
	isActive?: boolean;
	children?: React.ReactNode;
	onClickBg?: () => void;
	onClose?: () => void;
	afterClose?: () => void;
	className?: string;
	zIndex?: number;
};

export function useBaseModalContext() {
	return React.useContext(BaseModalContext);
}

export function BaseModal({
	children,
	isActive = false,
	onClickBg,
	onClose,
	afterClose,
	className,
	zIndex,
}: ModalProps) {
	const [canClose, setCanClose] = React.useState(true);
	const [needMount, setNeedMount] = React.useState(isActive);

	const handleClose = useRefCallback(() => {
		if (canClose) {
			onClose?.();
		}
	});

	const handleBgClick = useRefCallback(() => {
		if (canClose) {
			onClickBg?.();
		}
	});

	const context = React.useMemo(
		() => ({ onClose: handleClose, canClose, setCanClose }),
		[handleClose, canClose, setCanClose],
	);

	if (!needMount && isActive) {
		setNeedMount(true);
	}

	const mounted = useIsMounted();

	return mounted && needMount
		? ReactDOM.createPortal(
				<BaseModalContext.Provider value={context}>
					<div
						className={styles.layout}
						data-is-active={isActive}
						style={{ zIndex }}
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
						<div className={styles.bg} onClick={handleBgClick} />
					</div>
				</BaseModalContext.Provider>,
				document.body,
		  )
		: null;
}
