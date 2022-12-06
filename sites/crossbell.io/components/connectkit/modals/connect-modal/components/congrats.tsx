import React from "react";
import { Text } from "@mantine/core";
import classNames from "classnames";

import Image from "@/components/common/Image";

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
	return (
		<div className="sm:w-360px relative z-0 p-24px text-[#082135] bg-[#F5F5F5]">
			{!!timeout && (
				<div className={classNames(styles.progress, "mb-12px")}>
					<div
						className={styles.progressFill}
						style={{ animationDuration: timeout }}
						onAnimationEnd={onClose}
					/>
				</div>
			)}

			<div className="mb-24px pb-9px flex items-center">
				<p className="m-0 text-14px opacity-60">{tips}</p>

				<button
					className="border-none outline-none bg-transparent p-4px ml-auto cursor-pointer"
					onClick={onClose}
				>
					<Text className="i-csb:close text-24px text-[#999]" />
				</button>
			</div>

			<div className="text-center">
				<h2 className="text-24px font-600 mt-0 mb-13px font-deca">{title}</h2>
				<p className="text-15px font-300 m-0">{desc}</p>
			</div>

			<div className="aspect-308/228 relative -mt-20px">
				<Image
					fill
					placeholder="empty"
					src="/images/connect-kit/congrats/illustration.png"
				/>
			</div>

			<div className="absolute inset-0 -z-1 opacity-50">
				<Image
					fill
					className="object-cover"
					placeholder="empty"
					src="/images/connect-kit/congrats/bg.png"
				/>
			</div>

			<button
				className="w-full h-48px flex items-center justify-center border-none bg-[#6AD991] outline-none rounded-16px text-white text-14px font-500 font-roboto cursor-pointer"
				onClick={onClickBtn}
			>
				{btnText}
			</button>
		</div>
	);
}
