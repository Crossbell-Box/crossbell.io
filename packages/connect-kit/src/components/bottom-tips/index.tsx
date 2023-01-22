import React from "react";
import { LightBulbIcon } from "@crossbell/ui";

import { ActionBtn, ActionBtnProps } from "../action-btn";

import styles from "./index.module.css";

export const BottomTips = ({ children, ...props }: ActionBtnProps) => (
	<ActionBtn color="ghost" className={styles.container} {...props}>
		<LightBulbIcon />
		{children}
	</ActionBtn>
);
