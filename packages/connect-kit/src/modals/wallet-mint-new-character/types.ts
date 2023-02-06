import { CongratsProps } from "../../components";
import { SceneType } from "../../utils";

import { MintCharacterProps } from "./scenes/mint-character";

export enum SceneKind {
	mintCharacter = "mintCharacter",
	congrats = "congrats",
}

export type SceneWithContext =
	| SceneType<SceneKind.congrats, CongratsProps>
	| SceneType<SceneKind.mintCharacter, MintCharacterProps>;

export type Scene = SceneWithContext;
