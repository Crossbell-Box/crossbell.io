import React from "react";
import Image from "next/image";
import { CrossbellLogo } from "@crossbell/ui";
import { Channel } from "phoenix";
import { useRefCallback } from "@crossbell/util-hooks";
import { useQuery } from "@tanstack/react-query";
import FlipNumbers from "react-flip-numbers";
import { useIsSsrReady } from "@crossbell/connect-kit";
import { useMediaQuery } from "@mantine/hooks";

import { breakpoints } from "~/scripts/unocss/breakpoints";

import type { ScanStatusData } from "@/pages/api/scan-status";
import { Star } from "@/components/pages/landing-page/components/star";

import {
	newAddressChannel,
	newBlocksChannel,
	newTransactionChannel,
} from "../../scan-socket";

import mobileBg from "./mobile-bg.svg";
import pcBg from "./pc-bg.svg";
import { AutoShow } from "@/components/pages/landing-page/components/auto-show";

const btnStyle =
	"ux-overlay h-[48px] flex items-center justify-center min-w-[193px] rounded-[12px] text-[14px] font-medium border-none";

export function CrossbellScanSection() {
	const status = useScanStatus();
	const isSsrReady = useIsSsrReady();
	const isMD = useMediaQuery(`(min-width: ${breakpoints.md}px)`);

	return (
		<div>
			<div className="max-w-[675px] md:max-w-[1500px] mx-auto mt-[32px] md:mt-[211px] md:px-6">
				<AutoShow className="relative aspect-[390/700] md:aspect-[1500/770] z-0 flex flex-col items-center justify-center text-center z-10">
					<Image
						fill
						src={mobileBg}
						alt="Background Image"
						className="-z-10 md:hidden"
					/>
					<Image
						fill
						src={pcBg}
						alt="Background Image"
						className="-z-10 hidden md:block"
					/>

					<CrossbellLogo className="w-[184px] h-[68px] md:w-[250px]" />

					<h3 className="font-deca font-400 text-[28px] font-normal my-[16px] md:text-[64px] md:flex gap-[0.5ch]">
						<span>Lightning-fast</span>
						<br className="md:hidden" />
						<span>Confirmation</span>
					</h3>

					<p className="font-deca text-[#ADADAD] px-[30px] text-[16px] mb-[40px] mt-0 relative md:text-[24px] font-300">
						<Star className="absolute top-0 left-[-2px] w-[32px] h-[32px] hidden md:block" />
						{"Interact instantly. Confirm with confidence. "}
						<br />
						Underlying Crossbell chain makes it happen
					</p>

					<div className="flex flex-col gap-[16px] md:flex-row-reverse md:gap-[64px]">
						<a
							className={`${btnStyle} bg-[#9688F2] text-[#fff]`}
							href="https://scan.crossbell.io"
							target="_blank"
						>
							Explore CrossbellScan
						</a>

						<a
							className={`${btnStyle} bg-[#F6F7F9] text-[#000]`}
							href="https://docs.crossbell.io"
							target="_blank"
						>
							Build Now
						</a>
					</div>
				</AutoShow>

				<AutoShow className="flex text-center mb-[27px] md:mb-[86px]">
					<div className="flex-1 w-0">
						<h5 className="text-[16px] md:text-[24px] font-normal mt-[16px] md:mt-[48px] mb-[4px] md:mb-[24px]">
							Average block time
						</h5>
						<div className="text-[28px] md:text-[48px] font-deca font-extralight m-0 leading-[1]">
							{(() => {
								const list = status.averageBlockTime.split(" ");
								const unit = list.pop();

								return (
									<>
										{list.join(" ")}{" "}
										<span className="text-[20px] md:text-[24px]">{unit}</span>
									</>
								);
							})()}
						</div>
					</div>

					<div className="flex-1 w-0">
						<h5 className="text-[16px] md:text-[24px] font-normal mt-[16px] md:mt-[48px] mb-[4px] md:mb-[24px]">
							Total transactions
						</h5>
						<div className="font-extralight m-0">
							{isSsrReady && (
								<FlipNumbers
									height={isMD ? 48 : 28}
									width={isMD ? 32 : 20}
									numberClassName="font-deca"
									nonNumberClassName="font-deca leading-[1] text-[28px] md:text-[48px]"
									color="white"
									background="transparent"
									play
									perspective={400}
									numbers={status.transactionCount.toLocaleString("en-US")}
								/>
							)}
						</div>
					</div>

					<div className="flex-1 w-0 hidden md:block">
						<h5 className="text-[16px] md:text-[24px] font-normal mt-[16px] md:mt-[48px] mb-[4px] md:mb-[24px]">
							Total blocks
						</h5>
						<div className="font-extralight m-0">
							{isSsrReady && (
								<FlipNumbers
									height={isMD ? 48 : 28}
									width={isMD ? 32 : 20}
									numberClassName="font-deca"
									nonNumberClassName="font-deca leading-[1] text-[28px] md:text-[48px]"
									color="white"
									background="transparent"
									play
									perspective={400}
									numbers={status.blockCount.toLocaleString("en-US")}
								/>
							)}
						</div>
					</div>

					<div className="flex-1 w-0 hidden md:block">
						<h5 className="text-[16px] md:text-[24px] font-normal mt-[16px] md:mt-[48px] mb-[4px] md:mb-[24px]">
							Wallet addresses
						</h5>
						<div className="font-extralight m-0">
							{isSsrReady && (
								<FlipNumbers
									height={isMD ? 48 : 28}
									width={isMD ? 32 : 20}
									numberClassName="font-deca"
									nonNumberClassName="font-deca leading-[1] text-[28px] md:text-[48px]"
									color="white"
									play
									perspective={400}
									numbers={status.addressCount.toLocaleString("en-US")}
								/>
							)}
						</div>
					</div>
				</AutoShow>
			</div>
		</div>
	);
}

function useScanStatus(): ScanStatusData {
	const [averageBlockTime, setAverageBlockTime] = React.useState("");
	const [transactionCount, setTransactionCount] = React.useState(0);
	const [blockCount, setBlockCount] = React.useState(0);
	const [addressCount, setAddressCount] = React.useState(0);

	useChannel(newAddressChannel, "count", (msg) =>
		setAddressCount(Number(msg.count.replace(/,/, "")))
	);

	useChannel(newBlocksChannel, "new_block", (msg) => {
		setBlockCount(msg.block_number);
		setAverageBlockTime(msg.average_block_time);
	});

	useChannel(newTransactionChannel, "transaction", () => {
		setTransactionCount((count) => count + 1);
	});

	const { data } = useQuery<ScanStatusData>(
		["crossbell.io", "scan-status"],
		() => fetch("/api/scan-status").then((res) => res.json()),
		{
			refetchOnWindowFocus: false, // to prevent random refresh
			refetchOnMount: false, // to prevent random refresh
		}
	);

	React.useEffect(() => {
		if (!data) return;

		setTransactionCount((count) => count + data.transactionCount);
	}, [data]);

	return {
		averageBlockTime: averageBlockTime || data?.averageBlockTime || "",
		transactionCount: transactionCount || data?.transactionCount || 0,
		blockCount: blockCount || data?.blockCount || 0,
		addressCount: addressCount || data?.addressCount || 0,
	};
}

function useChannel(
	getChannel: () => Channel,
	event: string,
	callback_: (msg: any) => void
) {
	const callback = useRefCallback(callback_);

	React.useEffect(() => {
		const channel = getChannel();
		const ref = channel.on(event, callback);

		return () => channel.off(event, ref);
	}, [getChannel, event, callback]);
}
