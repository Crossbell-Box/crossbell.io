import Image from "@/components/common/Image";
import { Text } from "@mantine/core";
import classNames from "classnames";
import { AnimatePresence, m } from "framer-motion";
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
			<AnimatePresence>
				{currentPageIndex === INDEX && (
					<m.div
						className="text-white flex flex-col h-screen justify-center items-center"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						{/* <Text className="text-xl">We empower you to</Text> */}
						<m.span
							transition={{ delay: 0.5 }}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							<Text className="font-deca font-300 text-2xl sm:text-3xl md:text-6xl">
								Own Your Social Activities
							</Text>
						</m.span>
					</m.div>
				)}
			</AnimatePresence>

			{/* scroll hint */}
			<div
				className="absolute bottom-100px left-50% translate-x--50% text-white cursor-pointer"
				onClick={() => onClickNext()}
			>
				<WelcomeRing withArrow>Scroll</WelcomeRing>
			</div>
		</BaseSection>
	);
}
