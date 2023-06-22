import React from "react";
import { DynamicContainerContent } from "@crossbell/ui";

import { Main } from "./scenes/main";

export default function SwitchNetworkModal() {
	return (
		<DynamicContainerContent id="SwitchNetworkModal">
			<Main />
		</DynamicContainerContent>
	);
}
