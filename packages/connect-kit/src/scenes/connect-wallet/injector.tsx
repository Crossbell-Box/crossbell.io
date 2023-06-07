import React from "react";
import { Popover } from "@mantine/core";
import classNames from "classnames";
import { RefreshFilledIcon } from "@crossbell/ui";

import { Wallet, WalletConnector } from "../../wallets";

import { ModalHeaderProps } from "../../components";

import commonStyles from "./index.module.css";
import styles from "./injector.module.css";
import { ConnectStatus } from "./types";
import { STATUS_TEXT_MAP } from "./text";
import { useConnectState } from "./use-connect-state";

export type ConnectWithInjectorProps = {
	Header: React.ComponentType<ModalHeaderProps>;
	wallet: Wallet;
	connector: WalletConnector;
};

export function ConnectWithInjector({
	Header,
	wallet,
	connector,
}: ConnectWithInjectorProps) {
	const state = useConnectState(connector);
	const { title, description } = STATUS_TEXT_MAP[state.status](wallet);

	return (
		<>
			<Header title={wallet.name} />
			<div data-animation="scale-fade-in" className={styles.container}>
				<div className={styles.iconContainer}>
					<div
						className={classNames(
							styles.iconContainerLayout,
							state.isErrorStatus && commonStyles.animateShake
						)}
					>
						<div className={styles.walletIcon}>{wallet.icon}</div>

						<div className={styles.loadingContainer}>
							{state.isErrorStatus && (
								<div
									key={state.status}
									className={classNames(
										styles.errorCircle,
										commonStyles.errorCircle
									)}
								/>
							)}

							<Loading
								className={classNames(
									styles.loading,
									state.status !== ConnectStatus.CONNECTING && styles.hidden
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
										styles.tryAgainBtn,
										!state.isShowTryAgain && styles.hidden,
										commonStyles.retryBtn
									)}
									onClick={state.connect}
									disabled={!state.isShowTryAgain}
								>
									<RefreshFilledIcon className={styles.tryAgainIcon} />
								</button>
							</Popover.Target>

							<Popover.Dropdown
								px={8}
								py={4}
								className={styles.tryAgainPopover}
							>
								<span className={styles.tryAgainTips}>Try again?</span>
							</Popover.Dropdown>
						</Popover>
					</div>
				</div>

				<h4 className={styles.title}>{title}</h4>

				<p className={styles.desc}>{description}</p>
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
					<stop stopColor="rgb(var(--color-26_136_248))"></stop>
					<stop
						offset="1"
						stopColor="rgb(var(--color-26_136_248))"
						stopOpacity="0"
					></stop>
				</linearGradient>
			</defs>
		</svg>
	);
}
