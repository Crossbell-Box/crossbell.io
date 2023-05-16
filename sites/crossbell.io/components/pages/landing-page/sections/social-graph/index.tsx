import React from "react";
import { ArrowRightIcon } from "@crossbell/ui";
import Image from "next/image";
import {
	useConnectedAccount,
	useWalletMintNewCharacterModal,
	useConnectModal,
	useUpgradeEmailAccountModal,
} from "@crossbell/connect-kit";

import { Illustration } from "./illustration";
import mintBtnImg from "./mint-btn-img.png";
import { AutoShow } from "@/components/pages/landing-page/components/auto-show";
import { useRefCallback } from "@crossbell/util-hooks";

export function SocialGraphSection() {
	const account = useConnectedAccount();
	const connectModal = useConnectModal();
	const walletMintNewCharacterModal = useWalletMintNewCharacterModal();
	const upgradeEmailAccountModal = useUpgradeEmailAccountModal();

	const onMint = useRefCallback(() => {
		if (account) {
			if (account.type === "wallet") {
				walletMintNewCharacterModal.show();
			} else {
				upgradeEmailAccountModal.show();
			}
		} else {
			connectModal.show();
		}
	});

	return (
		<div className="md:flex md:flex-row-reverse md:min-h-[800px] md:mt-0 md:pb-0 md:items-center">
			<AutoShow className="flex-1 flex justify-center items-center">
				<Illustration />
			</AutoShow>

			<div className="flex-1">
				<div className="md:flex md:justify-center">
					<div className="md:max-w-[805px]">
						<AutoShow className="px-[24px] mt-[64px] mb-[96px] md:mt-0 md:mb-[64px]">
							<h3 className="font-deca text-[24px] md:text-[64px] font-normal mt-0 mb-[8px] md:mb-[16px] leading-[30px] md:leading-[80px]">
								Craft your Social Graph
								<br />
								Take it Anywhere
							</h3>

							<p className="m-0 text-[16px] md:text-[24px] font-light text-[#ADADAD] leading-[20px] md:leading-[30px]">
								We stores your social relationships and creative content on
								Crossbell blockchain, free from corporate censorship. You can
								easily migrate your reputation and connect with fans on any new
								decentralized apps.
							</p>
						</AutoShow>

						<AutoShow className="flex justify-center md:justify-start px-[24px]">
							<button
								onClick={onMint}
								className="w-full max-w-[342px] md:w-[302px] h-[61px] relative bg-[#F6C549] border-none ux-overlay rounded-[12px] text-[#101010] text-[18px] flex items-center"
							>
								<Image
									src={mintBtnImg}
									alt="Mint Character Image"
									className="absolute left-[6px] bottom-0"
									width={147}
									height={104}
								/>
								<span className="ml-[123px] font-deca font-400">
									Mint Character
								</span>
								<ArrowRightIcon className="text-[24px] ml-[12px]" />
							</button>
						</AutoShow>
					</div>
				</div>
			</div>
		</div>
	);
}
