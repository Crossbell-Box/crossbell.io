import React from "react";

import { OperatorSyncWelcome } from "@/welcome";
import { useTurnSyncOn } from "@/hooks";

export default function Index() {
	const turnSyncOn = useTurnSyncOn();

	return <OperatorSyncWelcome onStart={turnSyncOn} />;
}
