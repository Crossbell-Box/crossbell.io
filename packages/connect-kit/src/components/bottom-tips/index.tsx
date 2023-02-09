import React from "react";
import { LightBulbIcon } from "@crossbell/ui";
import classNames from "classnames";

import { ActionBtn, ActionBtnProps } from "../action-btn";

import styles from "./index.module.css";

export const BottomTips = React.forwardRef<HTMLButtonElement, ActionBtnProps>(
	({ children, className, ...props }, ref) => (
		<ActionBtn
			color="ghost"
			className={classNames(styles.container, className)}
			ref={ref}
			{...props}
		>
			<LightBulbIcon />
			{children}
		</ActionBtn>
	)
);
