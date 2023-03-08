import React from "react";
import classNames from "classnames";
import { ArrowBackIcon } from "@crossbell/ui";

import commonStyles from "../../styles.module.css";
import styles from "./index.module.css";

export type SettingsSectionItemProps = {
	id: React.Key;
	icon?: React.ReactNode;
	disabled?: boolean;
	title: React.ReactNode;
	description?: React.ReactNode;
	onClick?: () => void;
	className?: string;
};

export type SettingsSectionProps = {
	title?: string;
	items: SettingsSectionItemProps[];
	className?: string;
};

export function SettingsSectionItem(props: SettingsSectionItemProps) {
	return (
		<div
			onClick={props.disabled ? undefined : props.onClick}
			className={classNames(
				styles.item,
				props.className,
				props.disabled
					? styles.disabled
					: !!props.onClick && commonStyles.uxOverlay
			)}
		>
			{props.icon && <div className={styles.itemIcon}>{props.icon}</div>}
			<div className={styles.itemMain}>
				<div>
					<div className={styles.itemTitle}>{props.title}</div>
					<div className={styles.itemDescription}>{props.description}</div>
				</div>
				{props.onClick && <ArrowBackIcon className={styles.actionIcon} />}
			</div>
		</div>
	);
}

export function SettingsSectionTitle({
	className,
	...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
	return <h4 className={classNames(styles.title, className)} {...props} />;
}

export function SettingsSection({
	title,
	items,
	className,
}: SettingsSectionProps) {
	if (items.length === 0) return null;

	return (
		<div className={classNames(styles.container, className)}>
			{title && <SettingsSectionTitle>{title}</SettingsSectionTitle>}
			<div className={styles.section}>
				{items.map((item) => (
					<SettingsSectionItem key={item.id} {...item} />
				))}
			</div>
		</div>
	);
}
