import React from "react";
import Image from "next/image";

import { Floating } from "./floating";
import { ConnectBtn } from "./connect-btn";
import mailImg from "./mail.svg";
import mailBgImg from "./mail-bg.svg";
import walletImg from "./wallet.svg";
import walletBgImg from "./wallet-bg.svg";
import { AutoShow } from "@/components/pages/landing-page/components/auto-show";
import { Star } from "@/components/pages/landing-page/components/star";

export type ConnectSectionProps = {
	onClickScrollDown: () => void;
};

export function ConnectSection({ onClickScrollDown }: ConnectSectionProps) {
	return (
		<div className="pb-[24px] md:h-[1200px] md:flex md:items-center relative z-0">
			<div className="w-full">
				<div className="h-[524px] md:h-full md:w-full md:left-0 md:top-0 relative md:absolute -z-10">
					<AutoShow className="absolute top-[203px] md:top-[316px] right-[47px] md:right-[17.5vw] flex">
						<Floating x={-3} y={10}>
							<Image
								src={mailImg}
								alt="Mail"
								className="md:w-[180px] md:h-[180px]"
							/>
						</Floating>
						<Image
							src={mailBgImg}
							alt="Mail Background"
							className="absolute left-[-330px] bottom-[-167px] -z-10 hidden md:block"
						/>
					</AutoShow>

					<AutoShow className="absolute top-[327px] md:top-[722px] left-[45px] md:left-[19vw] flex">
						<Floating x={5} y={12} delay={0.3}>
							<Image
								src={walletImg}
								alt="Wallet"
								className="md:w-[180px] md:h-[180px]"
							/>
						</Floating>
						<Image
							src={walletBgImg}
							alt="Wallet Background"
							className="absolute right-[-277px] top-[-122px] -z-10 hidden md:block"
						/>
					</AutoShow>
				</div>

				<AutoShow className="px-[24px] md:px-0 mb-[96px]">
					<h3 className="font-deca text-[24px] font-normal mt-0 mb-[16px] md:pl-[13.5vw] leading-[30px] md:text-[64px] md:leading-[80px]">
						Own your convenience
						<br />
						Always
					</h3>

					<p className="m-0 text-[16px] font-light text-[#ADADAD] leading-[20px] md:hidden">
						Beyond wallet logins, we also offer email logins. Give you the
						convenience but still maintain the most of your ownership.
					</p>
				</AutoShow>

				<AutoShow className="flex justify-center w-full">
					<ConnectBtn onClickScrollDown={onClickScrollDown} />
				</AutoShow>
			</div>

			<AutoShow className="hidden md:flex absolute flex-col gap-[8px] right-[86px] bottom-[72px] font-deca text-[24px]">
				<div className="font-300">Versatile Login Methods</div>

				<div className="font-400 flex items-center gap-[4px]">
					<Star className="w-[32px] h-[32px]" />
					Wallet Login
				</div>

				<div className="font-400 flex items-center gap-[4px]">
					<Star className="w-[32px] h-[32px]" />
					Email Login
				</div>
			</AutoShow>
		</div>
	);
}
