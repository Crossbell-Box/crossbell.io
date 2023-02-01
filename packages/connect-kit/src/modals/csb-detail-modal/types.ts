import { SceneType } from "../../utils";
import { CongratsProps } from "../../components";

export enum SceneKind {
	balance = "balance",
	transfer = "transfer",
	transferSuccess = "transferSuccess",
	claimCSB = "claimCSB",
	congrats = "congrats",
}

export type SceneWithContext = SceneType<SceneKind.congrats, CongratsProps>;

export type SceneWithoutContext = SceneType<
	Exclude<SceneKind, SceneWithContext["kind"]>
>;

export type Scene = SceneWithContext | SceneWithoutContext;
