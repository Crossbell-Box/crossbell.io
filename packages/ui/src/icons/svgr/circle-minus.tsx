import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const SvgCircleMinus = (
	props: SVGProps<SVGSVGElement>,
	ref: Ref<SVGSVGElement>
) => (
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
			d="M7 12.675h10v-1.5H7zM12 22c-1.367 0-2.658-.263-3.875-.787s-2.28-1.242-3.188-2.15-1.625-1.971-2.15-3.188S2 13.367 2 12c0-1.383.263-2.683.787-3.9s1.242-2.275 2.15-3.175 1.971-1.613 3.188-2.138S10.633 2 12 2c1.383 0 2.683.262 3.9.787s2.275 1.238 3.175 2.138 1.613 1.958 2.138 3.175S22 10.617 22 12c0 1.367-.263 2.658-.787 3.875s-1.238 2.28-2.138 3.188-1.958 1.625-3.175 2.15S13.383 22 12 22zm0-1.5c2.367 0 4.375-.83 6.025-2.487S20.5 14.35 20.5 12c0-2.367-.825-4.375-2.475-6.025S14.367 3.5 12 3.5c-2.35 0-4.354.825-6.013 2.475S3.5 9.633 3.5 12c0 2.35.83 4.354 2.487 6.013S9.65 20.5 12 20.5z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgCircleMinus);
export default ForwardRef;
