import React from "react";

import {
	ConnectWallet as Main,
	ConnectWalletProps as Props,
} from "../../../../scenes";
import { Header } from "../../components/header";

export type ConnectWalletProps = Omit<Props, "Header">;

export function ConnectWallet({ wallet }: ConnectWalletProps) {
	return <Main wallet={wallet} Header={Header} />;
}
