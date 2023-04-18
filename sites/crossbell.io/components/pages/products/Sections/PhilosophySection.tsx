import { Image } from "~/shared/components/image";
import { Text } from "@mantine/core";
import classNames from "classnames";
import { m } from "framer-motion";
import WelcomeRing from "../components/WelcomeRing";
import bgSvg from "@/public/images/pages/index/resources/bg.svg";
import BaseSection from "./BaseSection";

const INDEX = 0;

export default function PhilosophySection({
	currentPageIndex,
	onClickNext,
}: {
	currentPageIndex: number;
	onClickNext: () => void;
}) {
	return (
		<BaseSection className="relative h-screen">
			{/* bg */}
			<m.div
				className={classNames(
					"bg-black fixed top-0 bottom-0 left-0 right-0 z--1 transition-opacity-500",
					{
						"opacity-0": currentPageIndex !== INDEX,
						"opacity-100": currentPageIndex === INDEX,
					}
				)}
			>
				<Image
					src={bgSvg}
					alt="bg"
					className="absolute inset-0 w-screen h-screen blur-25px"
				/>
			</m.div>

			{/* main */}

			<m.div
				className="text-white flex justify-center items-center lg:justify-start lg:items-end h-screen px-5vw md:pl-10vw lg:pb-13vh lg:pl-300px"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			>
				{/* <Text className="text-xl">We empower you to</Text> */}
				<m.span
					transition={{ delay: 0.5 }}
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<Text className="font-deca font-300 text-2xl md:text-3xl lg:text-6xl mb-24px">
						Own your social activities
					</Text>

					<Text className="font-roboto font-400 max-w-533px text-[#B9B9B9]">
						Crossbell is a platform for owning your social activities, composed
						of an EVM-compatible blockchain and a set of smart contracts.
					</Text>
				</m.span>
			</m.div>

			{/* scroll hint */}
			<div
				className="absolute bottom-13vh right-1/2 transform translate-x-1/2 md:translate-x-0 md:bottom-95px md:right-100px text-white cursor-pointer"
				onClick={() => onClickNext()}
			>
				<WelcomeRing withArrow>Scroll</WelcomeRing>
			</div>
		</BaseSection>
	);
}
