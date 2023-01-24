export enum SceneKind {
	balance = "balance",
	transfer = "transfer",
	claimCSB = "claimCSB",
}

export type Scene = {
	kind: SceneKind;
};
