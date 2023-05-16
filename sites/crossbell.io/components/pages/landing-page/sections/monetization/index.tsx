import React from "react";
import { useMediaQuery } from "@mantine/hooks";

import { breakpoints } from "~/scripts/unocss/breakpoints";

import { PCSection } from "./pc";
import { MobileSection } from "./mobile";

export function MonetizationSection() {
	const isMD = useMediaQuery(`(min-width: ${breakpoints.md}px)`);
	return isMD ? <PCSection /> : <MobileSection />;
}
