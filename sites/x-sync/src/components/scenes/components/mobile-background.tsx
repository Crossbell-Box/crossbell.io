import React from "react";
import { m, MotionConfig } from "framer-motion";

export const MobileBackground = () => (
	<MotionConfig transition={{ duration: 0.8, type: "spring" }}>
		<div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden -z-1 children:absolute children:overflow-hidden">
			<m.div
				initial={false}
				animate={{
					top: percentage(136 / 844),
					left: -34,
					rotate: "25deg",
					borderRadius: 27,
					width: 90,
					height: 90,
				}}
			>
				<Image
					src="/images/sync/platform-icons/twitter.svg"
					alt="Twitter Icon"
				/>
			</m.div>

			<m.div
				initial={false}
				animate={{
					top: percentage(332 / 844),
					right: -23,
					rotate: "15deg",
					borderRadius: 18,
					width: 60,
					height: 60,
				}}
			>
				<Image
					src="/images/sync/platform-icons/substack.svg"
					alt="Substack Icon"
				/>
			</m.div>

			<m.div
				initial={false}
				animate={{
					top: percentage(693 / 844),
					left: percentage(235 / 390),
					rotate: "-30deg",
					borderRadius: 9,
					width: 30,
					height: 30,
				}}
			>
				<Image
					src="/images/sync/platform-icons/telegram.svg"
					alt="Telegram Icon"
				/>
			</m.div>

			<m.div
				initial={false}
				animate={{
					top: percentage(693 / 844),
					left: -9,
					rotate: "-30deg",
					borderRadius: 12,
					width: 40,
					height: 40,
				}}
			>
				<Image src="/images/sync/platform-icons/medium.svg" alt="Medium Icon" />
			</m.div>

			<m.div
				initial={false}
				animate={{
					top: percentage(786 / 844),
					left: percentage(85 / 390),
					rotate: "-15deg",
					borderRadius: 12,
					width: 40,
					height: 40,
				}}
			>
				<Image
					src="/images/sync/platform-icons/pinterest.svg"
					alt="Pinterest Icon"
				/>
			</m.div>

			<m.div
				initial={false}
				animate={{
					rotate: "30deg",
					bottom: -23,
					right: -23,
					borderRadius: 27,
					width: 90,
					height: 90,
				}}
			>
				<Image src="/images/sync/platform-icons/tiktok.svg" alt="Tiktok Icon" />
			</m.div>
		</div>
	</MotionConfig>
);

function percentage(num: number): string {
	return `${Math.round(num * 100)}%`;
}

function Image(props: React.ImgHTMLAttributes<HTMLImageElement>) {
	return (
		<img
			{...props}
			className="absolute top-0 left-0 w-full h-full object-contain"
		/>
	);
}
