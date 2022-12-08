import facepaint from "facepaint";

import { breakpoints } from "../../../scripts/unocss/breakpoints";

export const breakpoint = {
	xs: `@media (min-width: ${breakpoints.xs}px)`,
	sm: `@media (min-width: ${breakpoints.sm}px)`,
	md: `@media (min-width: ${breakpoints.md}px)`,
	lg: `@media (min-width: ${breakpoints.lg}px)`,
	xl: `@media (min-width: ${breakpoints.xl}px)`,
};

export const mq = facepaint([
	breakpoint.xs,
	breakpoint.sm,
	breakpoint.md,
	breakpoint.lg,
	breakpoint.xl,
]);
