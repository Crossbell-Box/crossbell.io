import React from "react";

import { useWeb2Url, CloseIcon } from "@crossbell/ui";

import { IMAGES } from "../../../utils";

import styles from "./congrats.module.css";

export type CongratsProps = {
	btnText: string;
	onClickBtn: () => void;
	onClose: () => void;
	title: string;
	desc: string;
	tips: string;
	timeout?: `${number}${"s" | "ms"}`;
};

export function Congrats({
	tips,
	desc,
	title,
	btnText,
	onClickBtn,
	onClose,
	timeout,
}: CongratsProps) {
	const illustrationUrl = useWeb2Url(IMAGES.addBtnImg);
	const bgUrl = useWeb2Url(IMAGES.congratsBg);

	return (
		<div className={styles.container}>
			{!!timeout && (
				<div className={styles.progress}>
					<div
						className={styles.progressFill}
						style={{ animationDuration: timeout }}
						onAnimationEnd={onClose}
					/>
				</div>
			)}

			<div className={styles.header}>
				<p className={styles.tips}>{tips}</p>

				<button className={styles.closeBtn} onClick={onClose}>
					<CloseIcon className={styles.closeIcon} />
				</button>
			</div>

			<div className={styles.main}>
				<h2 className={styles.title}>{title}</h2>
				<p className={styles.desc}>{desc}</p>
			</div>

			<div className={styles.illustration1}>
				<img className={styles.illustration1Img} src={illustrationUrl} />
			</div>

			<img className={styles.bg} src={bgUrl} />

			<button className={styles.btn} onClick={onClickBtn}>
				{btnText}
			</button>
		</div>
	);
}
