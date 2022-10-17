import { ComponentProps, PropsWithChildren } from "react";
import {
	MotionValue,
	m,
	AnimatePresence,
	useTime,
	useTransform,
} from "framer-motion";
import { Text, Title, UnstyledButton } from "@mantine/core";
import BaseSection from "./BaseSection";
import Padding from "./Padding";
import handImage from "@/public/images/pages/index/resources/hand.webp";
import Image from "@/components/common/Image";
import { NextLink } from "@mantine/next";
import classNames from "classnames";

export default function ParallaxSection({
	sectionIndex,
	currentPageIndex,
	className,
	title,
	description,
	btnText,
	btnHoverClassName,
	link,
	image,
	children,
}: PropsWithChildren<{
	sectionIndex: number;
	currentPageIndex: number;
	className?: string;
	title: string;
	description: string;
	btnText: string;
	btnHoverClassName?: string;
	link: string;
	image: ComponentProps<typeof Image>["src"];
}>) {
	const isCurrentPage = currentPageIndex === sectionIndex;

	// image animation
	const time = useTime();
	const y = useTransform(time, (v) => Math.cos(v / 1000) * 5);
	const rotate = useTransform(time, (v) => Math.sin(v / 1000));

	return (
		<BaseSection className="flex flex-row justify-center items-start">
			<Padding />

			{/* text */}
			<AnimatePresence>
				<div className="flex flex-wrap space-x-40px space-y-40px justify-around items-center mt-20vh">
					<m.div className="w-500px">
						{isCurrentPage && (
							<m.div
								transition={{ delay: 0.1 }}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								<Title order={3} className="font-500 text-40px">
									{title}
								</Title>
							</m.div>
						)}

						{isCurrentPage && (
							<m.div
								transition={{ delay: 0.3 }}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								<Text className="mt-30px font-300 text-18px">
									{description}
								</Text>
							</m.div>
						)}

						{/* button */}
						{isCurrentPage && (
							<m.div
								transition={{ delay: 0.5 }}
								initial={{ opacity: 0, transform: "translateX(-20px)" }}
								animate={{ opacity: 1, transform: "translateX(0px)" }}
								exit={{ opacity: 0, transform: "translateX(20px)" }}
							>
								<UnstyledButton
									component={NextLink}
									href={link}
									className={classNames(
										"mt-50px relative flex flex-row items-center justify-center space-x-10px w-300px h-60px rounded-md bg-black transition-colors group",
										btnHoverClassName
									)}
								>
									<Image
										src={handImage}
										alt="btn"
										className="absolute bottom-0 left-10px group-hover:scale-120 origin-bottom transition-transform-2000 w-160px h-auto"
										placeholder="empty"
									/>
									<div className="w-80px"></div>
									<Text className="text-white font-700 group-hover:text-xl transition-font-1500">
										{btnText}
									</Text>
									<svg width="18" height="17" viewBox="0 0 18 17" fill="none">
										<path
											d="M9.00002 0.225391L17.275 8.50039L9.00002 16.7754L7.32502 15.1254L12.75 9.67539H0.725025V7.32539H12.75L7.32502 1.90039L9.00002 0.225391Z"
											fill="white"
										/>
									</svg>
								</UnstyledButton>
							</m.div>
						)}
					</m.div>

					{/* image */}
					{isCurrentPage && (
						<m.div
							transition={{ delay: 0.3 }}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							<m.div
								style={{ y, rotate }}
								whileHover={{ scale: 1.2, rotate: "5deg" }}
							>
								{children ?? (
									<Image src={image} className="w-800px max-w-screen h-auto" />
								)}
							</m.div>
						</m.div>
					)}
				</div>
			</AnimatePresence>

			{/* <Padding /> */}
		</BaseSection>
	);
}
