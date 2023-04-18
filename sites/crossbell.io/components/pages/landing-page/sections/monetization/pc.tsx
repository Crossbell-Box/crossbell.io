import React from "react";
import Image from "next/image";
import { Scroll, KeyframesFn, KeyframesContext } from "scrollex";

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
import { AutoShow } from "@/components/pages/landing-page/components/auto-show";

const flowers = [
	flower1Url,
	flower2Url,
	flower3Url,
	flower4Url,
	flower5Url,
	flower6Url,
	flower8Url,
];

const stage = {
	one({ section }) {
		return section.topAt("container-top");
	},

	two({ section, container }) {
		return section.topAt("container-top") + container.height * 0.4;
	},

	three({ section, container }) {
		return section.topAt("container-top") + container.height;
	},
} satisfies Record<string, (context: KeyframesContext) => number>;

const keyframes = {
	logo: (context) => {
		return {
			[stage.one(context)]: {
				scale: 1,
				translateX: 0,
				translateY: 0,
			},

			[stage.two(context)]: {
				scale: 0.25,
				translateX: -context.container.width * 0.2,
				translateY: -120,
			},
		};
	},

	coins: (context) => {
		return {
			[stage.one(context)]: {
				translateX: -0,
			},

			[stage.two(context)]: {
				translateX: -context.container.width / 2,
			},
		};
	},

	title: (context) => {
		return {
			[stage.one(context)]: {
				translateX: 0,
				translateY: context.container.height * 0.4,
			},

			[stage.two(context)]: {
				translateX: -context.container.width * 0.2,
				translateY: 0,
			},
		};
	},

	content: (context) => {
		return {
			[stage.one(context)]: {
				opacity: 0,
			},

			[stage.two(context)]: {
				opacity: 1,
			},
		};
	},

	flowerIcon: (context) => {
		return {
			[stage.one(context)]: {
				translateX: 0,
				translateY: -32,
			},

			[stage.two(context)]: {
				translateY: -120,
				translateX: context.container.width * 0.38,
			},
		};
	},

	tipImg: (context) => {
		return {
			[stage.two(context)]: {
				opacity: 0,
				translateY: context.container.height,
			},

			[stage.three(context)]: {
				opacity: 1,
				translateY: -36,
			},
		};
	},
} satisfies Record<string, KeyframesFn>;

export function PCSection() {
	return (
		<div className="h-[200vh] relative mt-[15vw]">
			<div className="sticky top-0 h-[100vh] flex items-center justify-center">
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
					<Scroll.Item
						keyframes={keyframes.coins}
						className="w-[140vw] h-[140vw] md:w-[70vw] md:h-[70vw] max-w-[1346px] max-h-[1346px]"
					>
						<Image src={coinsUrl} alt="Coins" fill />
					</Scroll.Item>
				</div>

				<div>
					<Scroll.Item
						keyframes={keyframes.logo}
						className="w-[600px] h-[600px] mx-auto"
					>
						<Image src={logoUrl} alt="Monetization" fill />
					</Scroll.Item>
				</div>

				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
					<Scroll.Item keyframes={keyframes.title}>
						<AutoShow className="font-deca text-[36px] lg:text-[48px] font-bold text-center my-[16px] whitespace-nowrap">
							Effortless Monetization Built-in
						</AutoShow>

						<Scroll.Item keyframes={keyframes.content}>
							<p className="font-deca my-0 mx-auto text-[16px] font-light max-w-[40vw]">
								All notes posted on Crossbell by default could be mint. Author
								could set a mint price. Additionally, we have the tip mechanism.
								Everyone could support others using $MIRA, an ERC-20 token that
								could be bridged to Polygon to swap.
							</p>
						</Scroll.Item>
					</Scroll.Item>
				</div>

				<div className="absolute bottom-0 right-1/2 translate-x-1/2 flex justify-center">
					<Scroll.Item keyframes={keyframes.flowerIcon}>
						<Image
							src={flowerIconUrl}
							alt="Flower Icon"
							width={50}
							height={50}
						/>
					</Scroll.Item>
				</div>

				<div className="absolute w-[360px] bottom-1/2 right-[8vw] lg:right-[15vw] translate-y-1/2">
					<Scroll.Item keyframes={keyframes.tipImg}>
						<Image src={tipUrl} alt="Tip" width={360} height={459} />
					</Scroll.Item>
				</div>
			</div>

			<AutoShow className="relative z-0 overflow-hidden">
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
			</AutoShow>
		</div>
	);
}
