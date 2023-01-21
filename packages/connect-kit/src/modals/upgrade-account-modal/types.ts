export enum SceneKind {
	selectOptions = "selectOptions",
	connectKindDifferences = "connectKindDifferences",
	upgradeToWallet = "upgradeToWallet",
}

export type Scene = {
	kind: SceneKind;
};
