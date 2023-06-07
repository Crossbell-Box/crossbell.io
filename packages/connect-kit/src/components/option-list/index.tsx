import React from "react";
import classNames from "classnames";

import commonStyles from "../../styles.module.css";
import styles from "./index.module.css";

const colorMap = {
	gray: {
		color: "rgb(var(--csb-ck-color-text))",
		background: "rgb(var(--csb-ck-color-bg1))",
	},

	green: {
		color: "rgb(var(--color-255_255_255))",
		background: "rgb(var(--color-106_217_145))",
	},

	red: {
		color: "rgb(var(--color-255_255_255))",
		background: "rgb(var(--color-230_80_64))",
	},

	yellow: {
		color: "rgb(var(--color-60_60_60))",
		background: "rgb(var(--color-246_197_73))",
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
