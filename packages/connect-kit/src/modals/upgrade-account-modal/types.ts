import { SceneType } from "../../utils";
import {
	CongratsProps,
	OPSignSettingsProps,
	SignInWithWalletProps,
} from "../../components";

import { ConnectWalletProps } from "./scenes/connect-wallet";
import { ConfirmUpgradeProps } from "./scenes/confirm-upgrade";
import { MintCharacterProps } from "./scenes/mint-character";

export enum SceneKind {
	congrats = "congrats",
	getAWallet = "getAWallet",
	selectOptions = "selectOptions",
	connectKindDifferences = "connectKindDifferences",
	selectWalletToConnect = "selectWalletToConnect",
	connectWallet = "connectWallet",
	confirmUpgrade = "confirmUpgrade",
	signInWithWallet = "signInWithWallet",
	selectCharacters = "selectCharacters",
	opSignSettings = "opSignSettings",
	mintCharacter = "mintCharacter",
}

export type SceneWithContext =
	| SceneType<SceneKind.connectWallet, ConnectWalletProps>
	| SceneType<SceneKind.confirmUpgrade, ConfirmUpgradeProps>
	| SceneType<SceneKind.signInWithWallet, SignInWithWalletProps>
	| SceneType<SceneKind.opSignSettings, OPSignSettingsProps>
	| SceneType<SceneKind.congrats, CongratsProps>
	| SceneType<SceneKind.mintCharacter, MintCharacterProps>;

export type SceneWithoutContext = SceneType<
	Exclude<SceneKind, SceneWithContext["kind"]>
>;

export type Scene = SceneWithContext | SceneWithoutContext;
