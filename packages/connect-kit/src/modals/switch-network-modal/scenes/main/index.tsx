import React from "react";
import { useSwitchNetwork } from "wagmi";
import { CrossbellChainLogo, LoadingOverlay } from "@crossbell/ui";
import { crossbell } from "wagmi/chains";
import classNames from "classnames";

import {
	DynamicScenesContainer,
	DynamicScenesHeader,
	OptionList,
	OptionListItem,
} from "../../../../components";

import commonStyles from "./../../../../styles.module.css";
import styles from "./index.module.css";

import { useIsSupportedChain } from "../../use-is-supported-chain";
import { useSwitchNetworkModal } from "../../stores";

export function Main() {
	const switchNetworkModal = useSwitchNetworkModal();
	const isSupportedChain = useIsSupportedChain();
	const switchNetwork = useSwitchNetwork({ chainId: crossbell.id });
	const [displayExtraTips, setDisplayExtraTips] = React.useState(false);

	React.useEffect(() => {
		if (switchNetwork.isLoading) {
			const timeout = setTimeout(() => setDisplayExtraTips(true), 2000);
			return () => clearTimeout(timeout);
		} else {
			setDisplayExtraTips(false);
		}
	}, [switchNetwork.isLoading]);

	React.useEffect(() => {
		if (isSupportedChain) {
			switchNetworkModal.hide();
		}
	}, [isSupportedChain]);

	return (
		<DynamicScenesContainer
			padding="14px 24px 24px"
			header={
				<DynamicScenesHeader title="Switch Network" isAbleToClose={false} />
			}
		>
			<LoadingOverlay
				visible={switchNetwork.isLoading}
				color="rgb(var(--color-47_47_47))"
				blur={2}
			>
				<p className={styles.loadingTips}>Approve in Wallet</p>

				<p
					className={classNames(
						styles.extraLoadingTips,
						!displayExtraTips && styles.hidden
					)}
				>
					Please make sure you are using a wallet that supports custom networks.
				</p>

				<button
					className={classNames(
						styles.cancelBtn,
						commonStyles.uxOverlay,
						!displayExtraTips && styles.hidden
					)}
					onClick={switchNetwork.reset}
				>
					Cancel
				</button>
			</LoadingOverlay>
			<p className={styles.tips}>
				This app does not support the current connected network.
			</p>

			<OptionList>
				<OptionListItem
					color="yellow"
					className={styles.item}
					onClick={() => switchNetwork.switchNetwork?.()}
				>
					Switch to Crossbell
					<CrossbellChainLogo />
				</OptionListItem>

				<OptionListItem
					color="gray"
					className={styles.item}
					onClick={() => switchNetworkModal.hide()}
				>
					Cancel
				</OptionListItem>
			</OptionList>
		</DynamicScenesContainer>
	);
}
