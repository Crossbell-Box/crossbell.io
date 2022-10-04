import React from "react";
import { Text } from "@mantine/core";

import Image from "@/components/common/Image";
import classNames from "classnames";

export type CardProps = {
	index: number;
	total: number;
	children: React.ReactNode;
	onStart: () => void;
};

export function Card({ index, total, children, onStart }: CardProps) {
	return (
		<div className="px-24px py-16px border border-solid border-1 border-[#E1E8F7] bg-[#FCFDFF] bg-opacity-30 backdrop-filter backdrop-blur-7.5px rounded-28px">
			<div className="min-h-324px flex flex-col items-start">
				<div className="text-28px leading-36px text-blue-primary">
					{index + 1}
				</div>
				<p className="text-16px leading-24px mb-0 mt-16px color-[#1C1C1C] whitespace-pre-wrap">
					{(() => {
						if (typeof children === "string") {
							const [firstWord, ...words] = children.split(" ");

							return (
								<>
									<span className="text-28px leading-36px">{firstWord}</span>
									{" " + words.join(" ")}
								</>
							);
						} else {
							return children;
						}
					})()}
				</p>
				<div className="flex items-center justify-center w-full mt-auto">
					{Array.from({ length: total }).map((_, i) => (
						<div
							key={i}
							className={classNames(
								"w-4px h-4px rounded-full mx-4px transform transition",
								i === index ? "scale-200 bg-black/40" : "scale-100 bg-black/20"
							)}
						/>
					))}
				</div>
				<button
					onClick={onStart}
					className={classNames(
						"mt-28px border-none text-white w-full h-60px rounded-12px text-18px font-700 leading-21px flex items-center justify-end px-20px relative",
						"cursor-pointer bg-blue-primary hover:bg-blue-primary/90 active:bg-blue-primary/100"
					)}
				>
					<div className="absolute left-16px bottom-0 w-100px h-100px overflow-hidden">
						<Image
							src="/images/sync/hands-3d.png"
							className="object-contain absolute left-0 -bottom-17px"
							placeholder="empty"
							width={100}
							height={100}
						/>
					</div>
					Turn sync on
					<Text className="i-csb:arrow-right text-24px ml-8px" />
				</button>
			</div>
		</div>
	);
}
