import React from "react";
import Image from "next/image";
import classNames from "classnames";
import { useDisclosure, useElementSize } from "@mantine/hooks";
import dayjs from "dayjs";

import { FlipBox } from "@/components/common/FlipBox";
import logoUrl from "@/public/images/logo.svg";

import { AchievementLevel } from "~/shared/apis/achievement";

import { BadgeImage } from "./badge-image";
import styles from "./badge-icon.module.css";

export type BadgeIconProps = {
	level: AchievementLevel;
	noHoverEffect?: boolean;
};

const circlePathId = "achievement-badge-icon-circle-path";

const containerStyle: React.CSSProperties = {
	filter: "drop-shadow(0px 0px 16px rgba(127, 133, 140, 0.15))",
};

export function BadgeIcon({ level, noHoverEffect }: BadgeIconProps) {
	const [isFlipped, { open: flip, close: unFlip }] = useDisclosure(false);
	const { ref, width } = useElementSize();

	return (
		<div
			ref={ref}
			className="relative py-1/2 px-0 overflow-hidden cursor-pointer rounded-full"
			style={containerStyle}
			onPointerEnter={noHoverEffect ? undefined : flip}
			onPointerLeave={noHoverEffect ? undefined : unFlip}
		>
			<FlipBox
				isFlipped={isFlipped}
				className="absolute left-0 top-0"
				width="100%"
				height="100%"
				frontSide={
					<div className="bg-white w-full h-full rounded-full">
						<CircleText>{level.contractAddress}</CircleText>
						<div className="absolute top-0 left-0 w-full h-full p-10.7%">
							<BadgeImage level={level} />
						</div>
					</div>
				}
				backSide={
					<div className="bg-white w-full h-full rounded-full">
						<CircleText>{level.contractAddress}</CircleText>
						<BackSideLogo />
						<BackSideId containerWidth={width} level={level} />
					</div>
				}
			/>
		</div>
	);
}

type CircleToPathConfig = {
	id: string;
	cx: number;
	cy: number;
	r: number;
};

function circleToPath({ id, cx, cy, r }: CircleToPathConfig) {
	return (
		<path
			id={id}
			d={[
				`M ${cx} ${cy}`,
				`m -${r}, 0`,
				`a ${r},${r} 0 1,0 ${r * 2},0`,
				`a ${r},${r} 0 1,0 ${-(r * 2)},0`,
			].join(" ")}
		/>
	);
}

function CircleText({ children }: { children: string }) {
	return (
		<div className="absolute top-0 left-0 w-full h-full">
			<svg
				viewBox="0 0 100 100"
				width="100%"
				height="100%"
				className={classNames("w-full h-full object-contain", styles.spinning)}
			>
				<defs>{circleToPath({ id: circlePathId, cx: 50, cy: 50, r: 46 })}</defs>
				<text fontSize="5.7" fontWeight={300} letterSpacing="3">
					<textPath xlinkHref={`#${circlePathId}`}>{children}</textPath>
				</text>
			</svg>
		</div>
	);
}

function BackSideLogo() {
	return (
		<div className="absolute bottom-19% left-1/2 transform -translate-x-1/2 p-8.5%">
			<Image fill src={logoUrl} alt="Crossbell Logo" />
		</div>
	);
}

function BackSideId({
	containerWidth,
	level,
}: {
	containerWidth: number;
	level: AchievementLevel;
}) {
	const style = React.useMemo((): React.CSSProperties => {
		const ratio = containerWidth / 140;
		return { fontSize: `${ratio * 12}px` };
	}, [containerWidth]);

	const dateDisplay = React.useMemo(
		() => level.mintedAt && dayjs(level.mintedAt).format("On MMM DD, YYYY"),
		[level]
	);

	return (
		<div
			className={classNames(
				"absolute left-1/2 transform -translate-x-1/2 flex max-w-7/10",
				dateDisplay ? "bottom-43%" : "bottom-48.6%"
			)}
		>
			<div
				className={classNames(
					"leading-normal flex flex-col w-full items-center",
					dateDisplay ? "text-black" : "text-[#B3B8C7]"
				)}
				style={style}
			>
				<span className="truncate max-w-full font-600">
					{level.ownerHandle}
				</span>
				{dateDisplay && (
					<span className="text-0.9em truncate max-w-full">{dateDisplay}</span>
				)}
			</div>
		</div>
	);
}
