import React from "react";

import { ConnectKindDifferences as Differences } from "../../components";
import { Header } from "../components/header";

export function ConnectKindDifferences() {
	return (
		<div className="overflow-hidden">
			<Header title="Supported Features" />
			<Differences />
		</div>
	);
}
