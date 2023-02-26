import React from "react";
import { useRefCallback } from "@crossbell/util-hooks";

import {
	ConnectWallet as Main,
	ConnectWalletProps as Props,
} from "../../connect-wallet";

import { ConfirmUpgrade } from "../confirm-upgrade";

import { useDynamicScenesModal } from "../../../components";

export type ConnectWalletProps = Omit<Props, "Header" | "onConnect">;

export function ConnectWallet({ wallet }: ConnectWalletProps) {
	const updateLast = useDynamicScenesModal((s) => s.updateLast);

	const handleConnect = useRefCallback(() => {
		updateLast({
			kind: "confirm-upgrade",
			Component: () => <ConfirmUpgrade scene="confirm" />,
		});
	});

	return <Main onConnect={handleConnect} wallet={wallet} />;
}
