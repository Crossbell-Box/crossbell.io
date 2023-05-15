import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgTick = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="currentColor"
		viewBox="0 0 18 12"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path d="m6.45 11.85-5.6-5.6 1.075-1.075L6.45 9.7l9.6-9.6 1.075 1.075L6.45 11.85Z" />
	</svg>
);
const ForwardRef = forwardRef(SvgTick);
export default ForwardRef;
