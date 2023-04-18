import { Image } from "~/shared/components/image";
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
			<div className="absolute top-10% left--25vw w-150vw h-150vw animate-spin animate-duration-60s z--1 flex justify-center items-center">
				<Image src={bigRingImage} className="w-150vw h-auto" />
			</div>

			<Padding />

			<div className="absolute top-50% left-50% translate--50% block sm:hidden">
				<Image src={bellBlackImage} className="w-full h-auto" />
			</div>

			<div className="flex flex-col justify-end items-center h-screen w-full">
				<Image
					src={bellBlackImage}
					className="w-100px h-auto hidden sm:block translate-x--80px"
				/>
				<IndexFooter />
			</div>

			<div
				className="absolute bottom-0 left-50% translate-x--50% flex flex-col justify-center items-center group cursor-pointer"
				onClick={() => {
					onClickTop?.();
				}}
			>
				<Text className="text-gray">PAGE TOP</Text>

				<div className="relative w-2px h-30px sm:h-80px bg-gray/20">
					<div
						className="w-2px h-30px sm:h-80px scale-y-0 group-hover:scale-y-100 origin-bottom absolute bottom-0 transition-transform-1000"
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
