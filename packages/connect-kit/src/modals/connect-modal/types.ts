import {
	CongratsProps,
	OPSignSettingsProps,
	SignInWithWalletProps,
} from "../../components";
import { SceneType } from "../../utils";
import { MintCharacterProps } from "./scenes/mint-character";
import { ConnectWalletProps } from "./scenes/connect-wallet";

export enum SceneKind {
	congrats = "congrats",

	selectConnectKind = "selectConnectKind",
	aboutWallets = "aboutWallets",
	connectKindDifferences = "connectKindDifferences",

	selectWalletToConnect = "selectWalletToConnect",
	doNotHaveWallet = "doNotHaveWallet",
	connectWallet = "connectWallet",
	signInWithWallet = "signInWithWallet",
	selectCharacters = "selectCharacters",
	opSignSettings = "opSignSettings",
	mintCharacter = "mintCharacter",

	inputEmailToConnect = "inputEmailToConnect",

	inputEmailToRegister1 = "inputEmailToRegister1",
	inputEmailToRegister2 = "inputEmailToRegister2",
	inputEmailToRegister3 = "inputEmailToRegister3",

	inputEmailToResetPassword1 = "inputEmailToResetPassword1",
	inputEmailToResetPassword2 = "inputEmailToResetPassword2",
}

export type SceneWithContext =
	| SceneType<SceneKind.connectWallet, ConnectWalletProps>
	| SceneType<SceneKind.congrats, CongratsProps>
	| SceneType<SceneKind.signInWithWallet, SignInWithWalletProps>
	| SceneType<SceneKind.opSignSettings, OPSignSettingsProps>
	| SceneType<SceneKind.mintCharacter, MintCharacterProps>;

export type SceneWithoutContext = SceneType<
	Exclude<SceneKind, SceneWithContext["kind"]>
>;

export type Scene = SceneWithContext | SceneWithoutContext;

export type PickScene<Kind extends SceneKind> = {
	[S in Scene as S["kind"]]: S;
}[Kind];
