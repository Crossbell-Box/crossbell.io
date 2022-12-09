import React from "react";

import { SNSIcons } from "./sns-icons";
import { Scenes } from "./scenes";

export type OperatorSyncWelcomeProps = {
	onStart: () => void;
};

export default function OperatorSyncWelcome({
	onStart,
}: OperatorSyncWelcomeProps) {
	return (
		<div className="relative z-0 pt-70px pb-100px overflow-hidden">
			<SNSIcons />
			<Scenes onStart={onStart} />
		</div>
	);
}
