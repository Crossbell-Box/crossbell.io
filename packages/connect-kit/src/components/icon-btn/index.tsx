import React from "react";
import classNames from "classnames";

import commonStyles from "../../styles.module.css";
import styles from "./index.module.css";

export type IconBtnProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function IconBtn(props: IconBtnProps) {
	return (
		<button
			{...props}
			className={classNames(
				styles.btn,
				props.className,
				commonStyles.uxOverlay
			)}
		/>
	);
}
