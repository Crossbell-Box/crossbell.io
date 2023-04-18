import React from "react";
import Image from "next/image";
import { Scroll, KeyframesFn } from "scrollex";

import { CircleLayout, CircleItem } from "./circle-layout";

import logoUrl from "./logo-m.png";
import coinsUrl from "./coins.svg";
import tipUrl from "./tip.png";
import flowerIconUrl from "./flower-icon.svg";
import flower1Url from "./flower-1.svg";
import flower2Url from "./flower-2.svg";
import flower3Url from "./flower-3.svg";
import flower4Url from "./flower-4.svg";
import flower5Url from "./flower-5.svg";
import flower6Url from "./flower-6.svg";
import flower8Url from "./flower-8.svg";

const flowers = [
	flower1Url,
	flower2Url,
	flower3Url,
	flower4Url,
	flower5Url,
	flower6Url,
	flower8Url,
];

const keyframes = {
	logo: ({ section, container }) => {
		return {
			[section.topAt("container-center")]: {
				scale: 1,
			},

			[section.topAt("container-center") + container.height]: {
				scale: 0.6,
			},
		};
	},

	coins: ({ section, container }) => {
		return {
			[section.topAt("container-center")]: {
				translateX: -0,
				scale: 1,
			},

			[section.topAt("container-center") + container.height]: {
				translateX: -container.width / 2,
				scale: 1.6,
			},
		};
	},
} satisfies Record<string, KeyframesFn>;

export function MobileSection() {
	return (
		<div className="relative pb-[24px]">
			<div className="h-[100vh] mt-[220px] mb-[-112px]">
				<Scroll.Item className="sticky top-[50vh]" keyframes={keyframes.logo}>
					<div className="relative w-[200px] h-[200px] mx-auto -translate-y-1/2">
						<Image src={logoUrl} alt="Monetization" fill />

						<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[43%] -z-10">
							<Scroll.Item
								keyframes={keyframes.coins}
								className="w-[140vw] h-[140vw]"
							>
								<Image src={coinsUrl} alt="Coins" fill />
							</Scroll.Item>
						</div>
					</div>
				</Scroll.Item>
			</div>

			<div className="relative z-0 overflow-hidden">
				<h4 className="text-[24px] font-normal text-center my-[8px] mx-auto">
					Effortless Monetization
					<br />
					Built-in
				</h4>

				<p className="m-0 text-[16px] font-light px-[24px]">
					All notes posted on Crossbell by default could be mint. Author could
					set a mint price. Additionally, we have the tip mechanism. Everyone
					could support others using $MIRA, an ERC-20 token that could be
					bridged to Polygon to swap.
				</p>

				<div className="px-[24px] mt-[16px] mb-[246px] max-w-[342px] mx-auto">
					<div className="aspect-[684/872] relative">
						<Image src={tipUrl} alt="Tip" fill />
					</div>
				</div>

				<div className="absolute bottom-0 w-full translate-y-1/2">
					<CircleLayout paddingPercentage={10}>
						{flowers.map((flower, key) => (
							<CircleItem key={key}>
								<Image
									src={flower}
									alt="Flower Icon"
									width={150}
									height={150}
								/>
							</CircleItem>
						))}
					</CircleLayout>
				</div>
			</div>

			<div className="sticky bottom-[0]">
				<div className="flex justify-center translate-y-[-24px]">
					<Image src={flowerIconUrl} alt="Flower Icon" width={50} height={50} />
				</div>
			</div>
		</div>
	);
}
