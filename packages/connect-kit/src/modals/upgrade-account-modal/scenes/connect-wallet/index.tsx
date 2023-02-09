import React from "react";
import { useRefCallback } from "@crossbell/util-hooks";

import {
	ConnectWallet as Main,
	ConnectWalletProps as Props,
} from "../../../../scenes";
import { Header } from "../../components/header";
import { useScenesStore } from "../../stores";
import { SceneKind } from "../../types";

export type ConnectWalletProps = Omit<Props, "Header" | "onConnect">;

export function ConnectWallet({ wallet }: ConnectWalletProps) {
	const updateLast = useScenesStore((s) => s.updateLast);

	const handleConnect = useRefCallback(() => {
		updateLast({ kind: SceneKind.confirmUpgrade, scene: "confirm" });
	});

	return <Main onConnect={handleConnect} wallet={wallet} Header={Header} />;
}
