import Image from "@/components/common/Image";
import { PropsWithChildren } from "react";
import BaseSection from "./BaseSection";

import bigRingImage from "@/public/images/pages/index/resources/big-ring.svg";
import bellBlackImage from "@/public/images/pages/index/resources/bell-black.svg";
import IndexFooter from "../components/Footer";
import Padding from "./Padding";
import { Text } from "@mantine/core";

export default function FooterSection({
	onClickTop,
}: PropsWithChildren<{
	onClickTop: () => void;
}>) {
	return (
		<BaseSection className="relative flex flex-row">
			<div className="absolute top-20px left--25vw w-150vw h-auto animate-spin animate-duration-60s z--1">
				<Image src={bigRingImage} className="w-150vw" />
			</div>

			<Padding />

			<div className="absolute top-50% left-50% translate--50%">
				<Image src={bellBlackImage} />
			</div>

			<div className="flex flex-col justify-end items-center h-screen w-full">
				<IndexFooter />
			</div>

			<div
				className="absolute bottom-0 left-50% translate-x--50% flex flex-col justify-center items-center group cursor-pointer"
				onClick={() => {
					onClickTop?.();
				}}
			>
				<Text className="text-gray">PAGE TOP</Text>

				<div className="relative w-2px h-80px bg-gray/20">
					<div
						className="w-2px h-80px scale-y-0 group-hover:scale-y-100 origin-bottom absolute bottom-0 transition-transform-1000"
						style={{
							background:
								"linear-gradient(0deg, #F6C549 0%, #E65040 23.44%, #9688F2 50.52%, #5B89F7 76.04%, #6AD991 100%)",
						}}
					></div>
				</div>
			</div>
		</BaseSection>
	);
}
