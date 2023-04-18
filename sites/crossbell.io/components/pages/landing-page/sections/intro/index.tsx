import React from "react";
import classNames from "classnames";
import { useDisclosure } from "@crossbell/util-hooks";
import Image from "next/image";

import WelcomeRing from "@/components/pages/products/components/WelcomeRing";

import styles from "./index.module.css";
import bgImg from "./background.png";

export type IntroSectionProps = {
	onClickNext: () => void;
};

const tipsClassname =
	"font-light text-[16px] text-[#ADADAD] md:text-[24px] md:text-[#fff] md:font-normal";

export function IntroSection({ onClickNext }: IntroSectionProps) {
	const [isActive, { toggle }] = useDisclosure(false);

	const socialOwnership = (
		<span
			className="md:underline md:text-[#F6C549] md:font-bold md:cursor-pointer"
			onClick={toggle}
		>
			social ownership
		</span>
	);

	return (
		<div className="min-h-[100vh] flex flex-col px-24px md:flex-row md:items-end md:gap-2 md:justify-between md:px-6 lg:px-[85px] mx-auto relative z-0">
			<div className="absolute -z-10 w-[84%] h-[95%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none blur-[125px]">
				<Image src={bgImg} alt="Background" fill className="object-contain" />
			</div>

			<div className="mt-[auto] text-[#fff] text-center md:text-left">
				<h3 className="font-deca font-300 text-[24px] mb-[8px] md:text-[96px] md:mb-[24px] md:font-light leading-[1.3]">
					Own your social activities
				</h3>

				<div
					className={classNames(
						styles.description,
						isActive && styles.isActive
					)}
				>
					<p className={classNames(tipsClassname)}>
						{"Crossbell is a "}
						{socialOwnership}
						{
							" platform to build cutting-edge social dApps. Delight in seamless developer integration and smooth end-user experiences. Embrace the future of social networking."
						}
					</p>

					<p className={classNames(tipsClassname)}>
						{"What is "}
						{socialOwnership}
						?
						<br />
						1. no Internet platform can censor or delete your data.
						<br />
						2. no third-party platform restrictions or commissions on the
						profits of your works.
					</p>
				</div>
			</div>

			<div className="flex-shrink-0">
				<div
					className="text-[#fff] cursor-pointer relative mb-[36px] mt-[97px] md:mb-[90px]"
					onClick={onClickNext}
				>
					<WelcomeRing withArrow>Scroll</WelcomeRing>
				</div>
			</div>
		</div>
	);
}
