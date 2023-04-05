import React from "react";
import confetti from "canvas-confetti";
import classNames from "classnames";
import { useWeb2Url, CloseIcon } from "@crossbell/ui";

import { IMAGES } from "../../utils";

import styles from "./index.module.css";

export type CongratsProps = {
	btnText: string;
	onClickBtn: () => void;
	onClose: () => void;
	title: string;
	desc: string;
	tips: string;
	timeout?: `${number}${"s" | "ms"}`;
	illustration?: React.ReactNode;
	className?: string;
};

export function Congrats({
	tips,
	desc,
	title,
	btnText,
	onClickBtn,
	onClose,
	timeout,
	illustration,
	className,
}: CongratsProps) {
	const illustrationUrl = useWeb2Url(IMAGES.addBtnImg);
	const bgUrl = useWeb2Url(IMAGES.congratsBg);

	React.useEffect(showConfetti, []);

	return (
		<div className={classNames(styles.container, className)}>
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

			{illustration ?? (
				<div className={styles.illustration1}>
					<img className={styles.illustration1Img} src={illustrationUrl} />
				</div>
			)}

			<img className={styles.bg} src={bgUrl} />

			{btnText && (
				<button className={styles.btn} onClick={onClickBtn}>
					{btnText}
				</button>
			)}
		</div>
	);
}

function showConfetti() {
	const end = Date.now() + 100;
	const config: confetti.Options = {
		particleCount: 25,
		startVelocity: 90,
		angle: 60,
		spread: 60,
		origin: { x: 0, y: 1 },
		zIndex: 300,
		gravity: 1.5,
		colors: ["#6AD991", "#F6C549", "#E65040", "#5B89F7", "#9688F2"],
	};

	(function frame() {
		confetti({
			...config,
			angle: 60,
			origin: { x: 0, y: 1 },
		});

		confetti({
			...config,
			angle: 120,
			origin: { x: 1, y: 1 },
		});

		if (Date.now() < end) {
			requestAnimationFrame(frame);
		}
	})();
}
