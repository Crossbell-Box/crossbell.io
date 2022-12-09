import React from "react";

import { SNSIcons } from "./sns-icons";
import { Scenes } from "../scenes";

export type OperatorSyncWelcomeProps = {
	onStart: () => void;
};

export function OperatorSyncWelcome({ onStart }: OperatorSyncWelcomeProps) {
	return (
		<div className="relative z-0 min-h-100vh flex items-center justify-center overflow-hidden">
			<SNSIcons />
			<Scenes onStart={onStart} />
		</div>
	);
}
