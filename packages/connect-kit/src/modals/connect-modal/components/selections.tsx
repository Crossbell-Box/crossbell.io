import React from "react";
import classNames from "classnames";

import commonStyles from "../../../styles.module.css";
import styles from "./selections.module.css";

export type Selection = {
	id: string;
	title: React.ReactNode;
	icon: React.ReactNode;
	style?: React.CSSProperties;
	className?: string;
	onClick: () => void;
};

export type SelectionsProps = {
	items: Selection[];
};

export function Selections({ items }: SelectionsProps) {
	return (
		<div className={styles.container}>
			{items.map((item) => (
				<div
					key={item.id}
					className={classNames(
						styles.item,
						commonStyles.uxOverlay,
						item.className,
					)}
					style={item.style}
					onClick={item.onClick}
				>
					<span className={styles.itemTitle}>{item.title}</span>
					{item.icon}
				</div>
			))}
		</div>
	);
}
