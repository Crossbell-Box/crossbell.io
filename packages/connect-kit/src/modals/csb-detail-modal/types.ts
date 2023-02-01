export enum SceneKind {
	balance = "balance",
	transfer = "transfer",
	transferSuccess = "transferSuccess",
	claimCSB = "claimCSB",
}

export type Scene = {
	kind: SceneKind;
};
