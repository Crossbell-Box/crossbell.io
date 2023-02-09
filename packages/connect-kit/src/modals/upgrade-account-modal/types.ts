import { SceneType } from "../../utils";
import { CongratsProps } from "../../components";

import { ConnectWalletProps } from "./scenes/connect-wallet";
import { ConfirmUpgradeProps } from "./scenes/confirm-upgrade";

export enum SceneKind {
	congrats = "congrats",
	getAWallet = "getAWallet",
	selectOptions = "selectOptions",
	connectKindDifferences = "connectKindDifferences",
	selectWalletToConnect = "selectWalletToConnect",
	connectWallet = "connectWallet",
	confirmUpgrade = "confirmUpgrade",
}

export type SceneWithContext =
	| SceneType<SceneKind.connectWallet, ConnectWalletProps>
	| SceneType<SceneKind.confirmUpgrade, ConfirmUpgradeProps>
	| SceneType<SceneKind.congrats, CongratsProps>;

export type SceneWithoutContext = SceneType<
	Exclude<SceneKind, SceneWithContext["kind"]>
>;

export type Scene = SceneWithContext | SceneWithoutContext;
