import React from "react";
import Image from "next/image";
import classNames from "classnames";
import { useDisclosure, useElementSize } from "@mantine/hooks";
import { useWeb2Url } from "@crossbell/ipfs-react";

import { FlipBox } from "@/components/common/FlipBox";
import logoUrl from "@/public/images/logo.svg";

import type { BadgeLevelInfo } from "./types";
import styles from "./badge-icon.module.css";

export type BadgeIconProps = {
	levelInfo: BadgeLevelInfo;
	circleHash: string;
};

const circlePathId = "achievement-badge-icon-circle-path";

const containerStyle: React.CSSProperties = {
	filter: "drop-shadow(0px 0px 16px rgba(127, 133, 140, 0.15))",
};

export function BadgeIcon({ circleHash, levelInfo }: BadgeIconProps) {
	const [isFlipped, { open: flip, close: unFlip }] = useDisclosure(false);
	const url = useWeb2Url(levelInfo.img) ?? levelInfo.img;
	const { ref, width } = useElementSize();

	return (
		<div
			ref={ref}
			className="relative py-1/2 px-0 overflow-hidden cursor-pointer rounded-full"
			style={containerStyle}
			onPointerEnter={flip}
			onPointerLeave={unFlip}
		>
			<FlipBox
				isFlipped={isFlipped}
				className="absolute left-0 top-0"
				width="100%"
				height="100%"
				frontSide={
					<div className="bg-white w-full h-full rounded-full">
						<CircleText>{circleHash}</CircleText>
						<BadgeImage src={url} />
					</div>
				}
				backSide={
					<div className="bg-white w-full h-full rounded-full">
						<CircleText>{circleHash}</CircleText>
						<BackSideLogo />
						{levelInfo.mintId && (
							<BackSideId containerWidth={width} mintId={levelInfo.mintId} />
						)}
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
				<text fontSize="7.5" letterSpacing="2">
					<textPath xlinkHref={`#${circlePathId}`} offset="100%">
						<animate
							attributeName="startOffset"
							from="100%"
							to="0%"
							begin="0s"
							dur="2s"
						/>
						{children}
					</textPath>
				</text>
			</svg>
		</div>
	);
}

function BadgeImage({ src }: { src: string }) {
	return (
		<div className="absolute top-0 left-0 w-full h-full p-10.7%">
			<div className="relative w-full h-full">
				<Image unoptimized layout="fill" src={src} alt="Badge" />
			</div>
		</div>
	);
}

function BackSideLogo() {
	return (
		<div className="absolute bottom-19% left-1/2 transform -translate-x-1/2 p-8.5%">
			<Image layout="fill" src={logoUrl} alt="Crossbell Logo" />
		</div>
	);
}

function BackSideId({
	containerWidth,
	mintId,
}: {
	containerWidth: number;
	mintId: number;
}) {
	const style = React.useMemo((): React.CSSProperties => {
		const ratio = containerWidth / 140;
		return {
			padding: `0 ${ratio * 12}px`,
			fontSize: `${ratio * 11}px`,
		};
	}, [containerWidth]);

	return (
		<div className="absolute bottom-48% left-1/2 transform -translate-x-1/2 flex max-w-7/10">
			<span
				className="bg-purple-primary rounded-full text-white font-500 leading-normal truncate"
				style={style}
			>
				#{mintId}
			</span>
		</div>
	);
}
