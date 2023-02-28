import React from "react";
import classNames from "classnames";
import { ArrowBackIcon } from "@crossbell/ui";

import commonStyles from "../../styles.module.css";
import styles from "./index.module.css";

export type SettingsSectionItem = {
	id: React.Key;
	icon: React.ReactNode;
	title: React.ReactNode;
	disabled?: boolean;
	description?: React.ReactNode;
	onClick?: () => void;
};

export type SettingsSectionProps = {
	title: string;
	items: SettingsSectionItem[];
	className?: string;
};

export function SettingsSection({
	title,
	items,
	className,
}: SettingsSectionProps) {
	if (items.length === 0) return null;

	return (
		<div className={classNames(styles.container, className)}>
			<h4 className={styles.title}>{title}</h4>
			<div className={styles.section}>
				{items.map((item) => (
					<div
						key={item.id}
						onClick={item.disabled ? undefined : item.onClick}
						className={classNames(
							styles.item,
							item.disabled ? styles.disabled : commonStyles.uxOverlay
						)}
					>
						<div className={styles.itemIcon}>{item.icon}</div>
						<div className={styles.itemMain}>
							<div>
								<div className={styles.itemTitle}>{item.title}</div>
								<div className={styles.itemDescription}>{item.description}</div>
							</div>
							<ArrowBackIcon className={styles.actionIcon} />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
