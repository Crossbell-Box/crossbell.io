import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgClose = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 24 24"
		ref={ref}
		{...props}
	>
		<path
			fill="currentColor"
			d="m6.225 18.975-1.2-1.2L10.8 12 5.025 6.225l1.2-1.2L12 10.8l5.775-5.775 1.2 1.2L13.2 12l5.775 5.775-1.2 1.2L12 13.2z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgClose);
export default ForwardRef;
