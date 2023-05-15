import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgSubstack = (
	props: SVGProps<SVGSVGElement>,
	ref: Ref<SVGSVGElement>
) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 12 12"
		ref={ref}
		{...props}
	>
		<path
			fill="currentColor"
			d="M9.526 4.747H2.5v-.945h7.027v.945ZM2.5 5.604V10l3.513-1.963L9.527 10V5.604H2.5ZM9.527 2H2.5v.945h7.027V2Z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgSubstack);
export default ForwardRef;
