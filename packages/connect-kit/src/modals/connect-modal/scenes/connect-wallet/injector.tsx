import React from "react";
import { Popover, Text } from "@mantine/core";
import classNames from "classnames";

import { Wallet, WalletConnector } from "../../../../wallets";

import { Header } from "../../components/header";

import styles from "./index.module.css";
import { ConnectStatus } from "./types";
import { STATUS_TEXT_MAP } from "./text";
import { useConnectState } from "./use-connect-state";

export type ConnectWithInjectorProps = {
	wallet: Wallet;
	connector: WalletConnector;
};

export function ConnectWithInjector({
	wallet,
	connector,
}: ConnectWithInjectorProps) {
	const state = useConnectState(connector);
	const { title, description } = STATUS_TEXT_MAP[state.status](wallet);

	return (
		<>
			<Header title={wallet.name} />
			<div
				data-animation="scale-fade-in"
				className="flex flex-col items-center text-center sm:w-295px mx-24px pb-20px"
			>
				<div className="min-h-150px flex items-center justify-center">
					<div
						className={classNames(
							"relative w-100px h-100px",
							state.isErrorStatus && styles.animateShake
						)}
					>
						<div className="absolute inset-6px transform scale-86">
							{wallet.icon}
						</div>

						<div className="absolute -inset-5px">
							{state.isErrorStatus && (
								<div
									key={state.status}
									className={classNames(
										"pointer-events-none absolute inset-0 rounded-full",
										styles.errorCircle
									)}
								/>
							)}

							<Loading
								className={classNames(
									"w-full h-full animate-spin animate-duration-1.2s",
									state.status === ConnectStatus.CONNECTING
										? "opacity-100"
										: "opacity-0"
								)}
							/>
						</div>

						<Popover
							opened={state.isShowTryAgainTooltip}
							position="right"
							withArrow
						>
							<Popover.Target>
								<button
									className={classNames(
										"absolute right-0 bottom-0 p-0 border-none bg-transparent z-0 cursor-pointer rounded-full",
										styles.retryBtn,
										state.isShowTryAgain
											? "opacity-100"
											: "opacity-0 pointer-events-none"
									)}
									onClick={state.connect}
									disabled={!state.isShowTryAgain}
								>
									<Text className="i-csb:refresh-filled text-32px text-white" />
								</button>
							</Popover.Target>

							<Popover.Dropdown px={8} py={4} className="rounded-8px">
								<span className="opacity-60 text-14px">Try again?</span>
							</Popover.Dropdown>
						</Popover>
					</div>
				</div>

				<h4 className="text-19px font-600 m-0">{title}</h4>

				<p className="text-16px text-[#999] mt-12px mb-0 whitespace-pre-wrap">
					{description}
				</p>
			</div>
		</>
	);
}

function Loading(props: React.SVGAttributes<SVGSVGElement>) {
	return (
		<svg
			width="102"
			height="102"
			viewBox="0 0 102 102"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M52 100C24.3858 100 2 77.6142 2 50"
				stroke="url(#paint0_linear_1943_4139)"
				strokeWidth="3.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
			<defs>
				<linearGradient
					id="paint0_linear_1943_4139"
					x1="2"
					y1="48.5"
					x2="53"
					y2="100"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#1A88F8"></stop>
					<stop offset="1" stopColor="#1A88F8" stopOpacity="0"></stop>
				</linearGradient>
			</defs>
		</svg>
	);
}
