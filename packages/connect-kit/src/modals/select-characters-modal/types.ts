import { CongratsProps, OPSignSettingsProps } from "../../components";
import { SceneType } from "../../utils";
import { MintCharacterProps } from "./scenes/mint-character";

export enum SceneKind {
	congrats = "congrats",
	selectCharacters = "selectCharacters",
	mintCharacter = "mintCharacter",
	opSignSettings = "opSignSettings",
}

export type SceneWithContext =
	| SceneType<SceneKind.congrats, CongratsProps>
	| SceneType<SceneKind.mintCharacter, MintCharacterProps>
	| SceneType<SceneKind.opSignSettings, OPSignSettingsProps>;

export type SceneWithoutContext = SceneType<
	Exclude<SceneKind, SceneWithContext["kind"]>
>;

export type Scene = SceneWithContext | SceneWithoutContext;
