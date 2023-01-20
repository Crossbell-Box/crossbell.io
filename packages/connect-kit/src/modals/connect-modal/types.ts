import { Wallet } from "../../wallets";

export enum SceneKind {
	selectConnectKind = "selectConnectKind",
	aboutWallets = "aboutWallets",
	connectKindDifferences = "connectKindDifferences",

	selectWalletToConnect = "selectWalletToConnect",
	doNotHaveWallet = "doNotHaveWallet",
	connectWallet = "connectWallet",
	signInWithWallet = "signInWithWallet",
	selectCharacters = "selectCharacters",
	mintCharacter = "mintCharacter",
	mintCharacterQuickly = "mintCharacterQuickly",

	inputEmailToConnect = "inputEmailToConnect",

	inputEmailToRegister1 = "inputEmailToRegister1",
	inputEmailToRegister2 = "inputEmailToRegister2",
	inputEmailToRegister3 = "inputEmailToRegister3",
	inputEmailToRegister4 = "inputEmailToRegister4",

	inputEmailToResetPassword1 = "inputEmailToResetPassword1",
	inputEmailToResetPassword2 = "inputEmailToResetPassword2",
	inputEmailToResetPassword3 = "inputEmailToResetPassword3",
}

export type SceneType<K extends SceneKind, Context = unknown> = {
	kind: K;
} & Context;

export type SceneWithContext = SceneType<
	SceneKind.connectWallet,
	{ wallet: Wallet }
>;

export type SceneWithoutContext = SceneType<
	Exclude<SceneKind, SceneWithContext["kind"]>
>;

export type Scene = SceneWithContext | SceneWithoutContext;

export type PickScene<Kind extends SceneKind> = {
	[S in Scene as S["kind"]]: S;
}[Kind];
