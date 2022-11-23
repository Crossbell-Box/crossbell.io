import React from "react";
import classNames from "classnames";

import styles from "./index.module.css";

export type ModalHeaderProps = {
	title: React.ReactNode;
	leftNode?: React.ReactNode;
	rightNode?: React.ReactNode;
};

export function ModalHeader({ title, leftNode, rightNode }: ModalHeaderProps) {
	return (
		<div
			data-animation="fade-in"
			className={classNames("pb-10px px-21px pt-23px", styles.container)}
		>
			<div className="flex items-center justify-between gap-1 relative">
				<div>{leftNode}</div>
				<div className="mx-auto text-16px font-500 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
					{title}
				</div>
				<div>{rightNode}</div>
			</div>
		</div>
	);
}
