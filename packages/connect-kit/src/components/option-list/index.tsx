import React from "react";
import classNames from "classnames";

import commonStyles from "../../styles.module.css";
import styles from "./index.module.css";

const colorMap = {
	gray: {
		color: "#000",
		background: "#F7F7F7",
	},

	green: {
		color: "#fff",
		background: "#6AD991",
	},
};

type OptionListItemBaseProps = {
	color: keyof typeof colorMap;
};

export type OptionListItemProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	keyof OptionListItemBaseProps
> &
	OptionListItemBaseProps;

export const OptionListItem = React.forwardRef<
	HTMLDivElement,
	OptionListItemProps
>(({ color, ...props }, ref) => (
	<div
		{...props}
		ref={ref}
		className={classNames(styles.item, commonStyles.uxOverlay, props.className)}
		style={{ ...colorMap[color], ...props.style }}
	/>
));

export const OptionList = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>((props, ref) => (
	<div
		{...props}
		ref={ref}
		className={classNames(styles.container, props.className)}
	/>
));
