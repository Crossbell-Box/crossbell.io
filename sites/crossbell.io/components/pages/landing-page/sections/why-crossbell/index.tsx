import React from "react";
import Image from "next/image";

import { Star } from "@/components/pages/landing-page/components/star";

import forDevelopersImg from "./for-developers.svg";
import forEndUsersImg from "./for-end-users.svg";
import forProjectsImg from "./for-projects.svg";
import { AutoShow } from "@/components/pages/landing-page/components/auto-show";

export function WhyCrossbellSection() {
	return (
		<div className="px-[24px] pt-[36px] pb-[24px] md:h-[1200px] md:py-0 md:flex md:items-center md:justify-center">
			<div>
				<AutoShow>
					<h4 className="font-deca flex items-center justify-center gap-[4px] text-[20px] md:text-[24px] font-light mt-0 mb-[8px] md:mb-[16px]">
						<Star className="md:text-[32px]" />
						Why Crossbell?
					</h4>
				</AutoShow>

				<AutoShow>
					<p className="font-deca font-400 text-[24px] leading-[30px] md:text-[64px] md:leading-[80px] text-center mt-0 mb-[48px] md:mb-[84px]">
						Go from a user to an owner today!
					</p>
				</AutoShow>

				<div className="bg-[#181818] md:bg-transparent flex flex-col rounded-[24px] text-center gap-[60px] md:gap-[24px] py-[24px] px-[2px] md:flex-row md:justify-between max-w-[1200px] md:mx-auto">
					<AutoShow className="bg-[#181818] md:rounded-[24px] md:pt-[80px] md:pb-[46px] px-2 md:px-[24px] md:max-w-[384px]">
						<Image
							src={forEndUsersImg}
							alt="For Developers"
							width={64}
							height={64}
							className="mb-[32px]"
						/>

						<h5 className="text-[20px] font-bold mt-0 mb-[16px]">
							For end-users
						</h5>

						<p className="text-[14px] text-[#ADADAD] font-deca font-light">
							{`Utilize Crossbell's ecosystem to unleash your project's potential and accelerate growth with their infrastructure and resources.`}
						</p>
					</AutoShow>

					<AutoShow className="bg-[#181818] md:rounded-[24px] md:pt-[80px] md:pb-[46px] px-2 md:px-[24px] md:max-w-[384px]">
						<Image
							src={forDevelopersImg}
							alt="For End Users"
							width={64}
							height={64}
							className="mb-[32px]"
						/>

						<h5 className="text-[20px] font-bold mt-0 mb-[16px]">
							For developers
						</h5>

						<p className="text-[14px] text-[#ADADAD] font-deca font-light">
							Access a toolkit with a cutting-edge technical stack and benefit
							from extensive documentation and supportive community.
						</p>
					</AutoShow>

					<AutoShow className="bg-[#181818] md:rounded-[24px] md:pt-[80px] md:pb-[46px] px-2 md:px-[24px] md:max-w-[384px]">
						<Image
							src={forProjectsImg}
							alt="For Projects"
							width={64}
							height={64}
							className="mb-[32px]"
						/>

						<h5 className="text-[20px] font-bold mt-0 mb-[16px]">
							For projects
						</h5>

						<p className="text-[14px] text-[#ADADAD] font-deca font-light">
							Get an on-chain identity on Crossbell, build reputation, post
							content everywhere, but earn money in one place.
						</p>
					</AutoShow>
				</div>
			</div>
		</div>
	);
}
