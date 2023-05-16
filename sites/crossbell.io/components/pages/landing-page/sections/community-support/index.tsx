import React from "react";
import Image from "next/image";

import styles from "./index.module.css";
import handImg from "./hand.svg";
import { AutoShow } from "@/components/pages/landing-page/components/auto-show";

export function CommunitySupportSection() {
	return (
		<div className="px-[24px] mt-[24px] md:mt-0 md:max-w-[674px] mx-auto relative">
			<AutoShow className={styles.card}>
				<Image
					src={handImg}
					alt="Hand Left"
					className="-z-10 absolute left-[-62px] bottom-[-32px] rotate-[180deg] w-[138px] h-[75px]"
				/>

				<Image
					src={handImg}
					alt="Hand Right"
					className="-z-10 absolute right-[-62px] top-[-32px] w-[138px] h-[75px]"
				/>

				<h3 className="font-deca font-600 text-center md:text-left text-[28px] md:text-[32px] mt-0 mb-[16px]">
					Community Support
				</h3>

				<p className="font-deca text-[16px] font-light mt-0 mb-[22px]">
					Wanna empower your users a world truly owning their social activities?
					Definitely! No matter if your project is Web2 or Web3, as long as it
					is focused on social, we provide full support to help you integrate
					with Crossbell.
				</p>

				<div className="md:flex md:gap-[40px] md:px-[24px]">
					<a
						className="ux-overlay bg-[#fff] text-[#000] text-[14px] font-medium w-full rounded-[12px] h-[48px] flex items-center justify-center mb-[22px] md:mb-0"
						href="mailto:contact@crossbell.io"
						target="_blank"
					>
						Email contact@crossbell.io
					</a>

					<a
						className="ux-overlay bg-[#fff] text-[#000] text-[14px] font-medium w-full rounded-[12px] h-[48px] flex items-center justify-center"
						href="https://discord.gg/4GCwDsruyj"
						target="_blank"
					>
						Join Crossbell Discord
					</a>
				</div>
			</AutoShow>
		</div>
	);
}
