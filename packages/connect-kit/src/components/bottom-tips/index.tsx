import React from "react";
import { LightBulbIcon } from "@crossbell/ui";
import classNames from "classnames";

import { ActionBtn, ActionBtnProps } from "../action-btn";

import styles from "./index.module.css";

export const BottomTips = ({
	children,
	className,
	...props
}: ActionBtnProps) => (
	<ActionBtn
		color="ghost"
		className={classNames(styles.container, className)}
		{...props}
	>
		<LightBulbIcon />
		{children}
	</ActionBtn>
);
