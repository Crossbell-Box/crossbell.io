import React from "react";
import { Scroll, KeyframesFn } from "scrollex";
import { useMediaQuery } from "@mantine/hooks";
import { breakpoints } from "~/scripts/unocss/breakpoints";

const keyframes = ({ isMD }: { isMD: boolean }) =>
	({
		title: ({ section, container }) => {
			return {
				[section.topAt(isMD ? "container-top" : "container-center")]: {
					opacity: 1,
				},

				[section.topAt("container-top") + (isMD ? container.height * 0.5 : 0)]:
					{
						opacity: 0.4,
					},
			};
		},

		content: ({ section, container }) => {
			return {
				[section.topAt("container-center")]: {
					opacity: 0,
					scale: 0.5,
				},

				[section.topAt("container-top") + (isMD ? container.height * 0.5 : 0)]:
					{
						opacity: 1,
						scale: 1,
					},
			};
		},
	} satisfies Record<string, KeyframesFn>);

export function WhatIsCrossbellSection() {
	const isMD = useMediaQuery(`(min-width: ${breakpoints.md}px)`);

	return (
		<div className="h-[120vh] md:h-[200vh]">
			<div className="min-h-[70vh] md:min-h-[100vh] sticky top-0 flex justify-center items-center">
				<div className="text-[#fff] px-[24px]">
					<Scroll.Item keyframes={keyframes({ isMD }).title}>
						<h3 className="font-deca font-400 text-[28px] leading-[35px] m-0 md:text-[72px] lg:text-[96px] md:leading-[1] text-center">
							What is Crossbell?
						</h3>
					</Scroll.Item>

					<Scroll.Item
						keyframes={keyframes({ isMD }).content}
						className="font-deca font-400 text-[28px] leading-[35px] mt-[16px] md:mt-[80px] max-w-[1515px] md:text-[64px] lg:text-[96px] md:leading-[1.2]"
					>
						Crossbell is a social ownership platform, comprised of an
						EVM-compatible blockchain and a set of smart contracts.
					</Scroll.Item>
				</div>
			</div>
		</div>
	);
}
