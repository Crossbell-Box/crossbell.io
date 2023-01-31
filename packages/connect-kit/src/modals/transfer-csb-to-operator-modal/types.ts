export enum SceneKind {
	transfer = "transfer",
	transferSuccess = "transferSuccess",
}

export type Scene = {
	kind: SceneKind;
};
