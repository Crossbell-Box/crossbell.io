import React from "react";
import { m, MotionConfig } from "framer-motion";

export type BackgroundProps = {
	isActive: boolean;
};

export const Background = ({ isActive }: BackgroundProps) => (
	<MotionConfig transition={{ duration: 0.8, type: "spring" }}>
		<div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden -z-1 children:absolute children:overflow-hidden">
			<m.div
				initial={false}
				animate={
					isActive
						? {
								top: percentage(125 / 900),
								left: -49,
								rotate: "24.95deg",
								borderRadius: 54,
								width: 180,
								height: 180,
						  }
						: {
								top: percentage(286 / 900),
								left: percentage(263 / 1440),
								rotate: "25deg",
								borderRadius: 27,
								width: 90,
								height: 90,
						  }
				}
			>
				<Image
					src="/images/sync/platform-icons/twitter.svg"
					alt="Twitter Icon"
				/>
			</m.div>

			<m.div
				initial={false}
				animate={
					isActive
						? {
								top: percentage(85 / 900),
								left: percentage(1221 / 1440),
								rotate: "15deg",
								borderRadius: 36,
								width: 120,
								height: 120,
						  }
						: {
								top: percentage(295 / 900),
								left: percentage(492 / 1440),
								rotate: "15deg",
								borderRadius: 18,
								width: 60,
								height: 60,
						  }
				}
			>
				<Image
					src="/images/sync/platform-icons/substack.svg"
					alt="Substack Icon"
				/>
			</m.div>

			<m.div
				initial={false}
				animate={
					isActive
						? {
								top: percentage(700 / 900),
								left: percentage(911 / 1440),
								rotate: "-30deg",
								borderRadius: 18,
								width: 60,
								height: 60,
						  }
						: {
								top: percentage(415 / 900),
								left: percentage(408 / 1440),
								rotate: "-30deg",
								borderRadius: 9,
								width: 30,
								height: 30,
						  }
				}
			>
				<Image
					src="/images/sync/platform-icons/telegram.svg"
					alt="Telegram Icon"
				/>
			</m.div>

			<m.div
				initial={false}
				animate={
					isActive
						? {
								top: percentage(645 / 900),
								left: percentage(103 / 1440),
								rotate: "-30deg",
								borderRadius: 24,
								width: 80,
								height: 80,
						  }
						: {
								top: percentage(451 / 900),
								left: percentage(290 / 1440),
								rotate: "-30deg",
								borderRadius: 12,
								width: 40,
								height: 40,
						  }
				}
			>
				<Image src="/images/sync/platform-icons/medium.svg" alt="Medium Icon" />
			</m.div>

			<m.div
				initial={false}
				animate={
					isActive
						? {
								top: percentage(815 / 900),
								left: percentage(369 / 1440),
								rotate: "-15deg",
								borderRadius: 24,
								width: 80,
								height: 80,
						  }
						: {
								rotate: "-15deg",
								top: percentage(511 / 900),
								left: percentage(379 / 1440),
								borderRadius: 12,
								width: 40,
								height: 40,
						  }
				}
			>
				<Image
					src="/images/sync/platform-icons/pinterest.svg"
					alt="Pinterest Icon"
				/>
			</m.div>

			<m.div
				initial={false}
				animate={
					isActive
						? {
								rotate: "30deg",
								top: percentage(695 / 900),
								left: percentage(1240 / 1440),
								borderRadius: 54,
								width: 180,
								height: 180,
						  }
						: {
								rotate: "30deg",
								top: percentage(437 / 900),
								left: percentage(487 / 1440),
								borderRadius: 27,
								width: 90,
								height: 90,
						  }
				}
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
