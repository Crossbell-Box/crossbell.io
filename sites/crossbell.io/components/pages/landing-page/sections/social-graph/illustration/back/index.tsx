import React from "react";
import Image from "next/image";
import { m } from "framer-motion";

import cardBg from "./card-bg.png";
import actionsImg from "./actions.png";
import badgeImg1 from "./badge-1.png";
import badgeImg2 from "./badge-2.png";
import mintGalleryImg from "./mint-gallery.png";
import noteImg from "./note.png";
import addToAppleWalletImg from "./add-to-apple-wallet.png";
import { useMediaQuery } from "@mantine/hooks";
import { breakpoints } from "~/scripts/unocss/breakpoints";

export function Back({ isActive }: { isActive: boolean }) {
	const isMD = useMediaQuery(`(min-width: ${breakpoints.md}px)`);

	return (
		<div className="flex items-center justify-center relative w-full h-full">
			<Image
				src={cardBg}
				alt="Card background"
				fill
				className="object-contain"
			/>

			<m.div
				className="absolute pointer-events-none"
				initial={false}
				animate={{
					top: isMD ? -145 : -69,
					left: isMD ? 114 : 54,
					width: isMD ? 675 : 323,
					height: isMD ? 80 : 38,
					scale: isActive ? 1 : 0.5,
					opacity: isActive ? 1 : 0,
				}}
			>
				<Image src={actionsImg} alt="actions img" fill />
			</m.div>

			<m.div
				className="absolute pointer-events-none"
				initial={false}
				animate={{
					top: isMD ? 83 : 40,
					left: isMD ? 264 : 126,
					width: isMD ? 140 : 67,
					height: isMD ? 140 : 67,
					scale: isActive ? 1 : 0.5,
					opacity: isActive ? 1 : 0,
				}}
			>
				<Image src={badgeImg1} alt="badge img 1" fill />
			</m.div>

			<m.div
				className="absolute pointer-events-none"
				initial={false}
				animate={{
					top: isMD ? -89 : -42,
					left: isMD ? -80 : -38,
					width: isMD ? 172 : 82,
					height: isMD ? 172 : 82,
					scale: isActive ? 1 : 0.5,
					opacity: isActive ? 1 : 0,
				}}
			>
				<Image src={badgeImg2} alt="badge img 2" fill />
			</m.div>

			<m.div
				className="absolute pointer-events-none"
				initial={false}
				animate={{
					top: isMD ? 304 : 145,
					left: isMD ? 249 : 119,
					width: isMD ? 276 : 132,
					height: isMD ? 90 : 43,
					scale: isActive ? 1 : 0.5,
					opacity: isActive ? 1 : 0,
				}}
			>
				<Image src={mintGalleryImg} alt="mint gallery img" fill />
			</m.div>

			<m.div
				className="absolute pointer-events-none"
				initial={false}
				animate={{
					top: isMD ? 305 : 137,
					left: isMD ? -286 : -145,
					width: isMD ? 337 : 161,
					height: isMD ? 250 : 119,
					scale: isActive ? 1 : 0.5,
					opacity: isActive ? 1 : 0,
				}}
			>
				<Image src={noteImg} alt="note img" fill />
			</m.div>

			<m.div
				className="absolute"
				initial={false}
				animate={{
					bottom: isMD ? -96 : -45,
					left: isMD ? 63 : 61,
					width: isMD ? 200 : 95,
					height: isMD ? 64 : 30,
					scale: isActive ? 1 : 0.5,
					opacity: isActive ? 1 : 0,
				}}
			>
				<a
					href="https://f.crossbell.io/pass"
					target="_blank"
					onClick={(e) => e.stopPropagation()}
				>
					<Image src={addToAppleWalletImg} alt="Add to Apple Wallet" fill />
				</a>
			</m.div>
		</div>
	);
}
