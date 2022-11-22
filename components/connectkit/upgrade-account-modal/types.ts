export enum SceneKind {
	selectOptions = "selectOptions",
	connectKindDifferences = "connectKindDifferences",
	upgradeToWallet = "upgradeToWallet",
}

export type SceneType<K extends SceneKind, Context = {}> = {
	kind: K;
} & Context;

export type Scene = SceneType<SceneKind>;

export type PickScene<Kind extends SceneKind> = {
	[S in Scene as S["kind"]]: S;
}[Kind];
