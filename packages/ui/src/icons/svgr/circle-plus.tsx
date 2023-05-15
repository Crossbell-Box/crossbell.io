import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgCirclePlus = (
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
			d="M11.325 17h1.5v-4.15H17v-1.5h-4.175V7h-1.5v4.35H7v1.5h4.325zM12 22c-1.367 0-2.658-.263-3.875-.787s-2.28-1.242-3.188-2.15-1.625-1.971-2.15-3.188S2 13.358 2 11.975c0-1.367.263-2.658.787-3.875s1.242-2.275 2.15-3.175 1.971-1.613 3.188-2.138S10.642 2 12.025 2c1.367 0 2.658.262 3.875.787s2.275 1.238 3.175 2.138 1.613 1.958 2.138 3.175S22 10.617 22 12c0 1.367-.263 2.658-.787 3.875s-1.238 2.28-2.138 3.188-1.958 1.625-3.175 2.15S13.383 22 12 22zm.025-1.5c2.35 0 4.35-.83 6-2.487s2.475-3.671 2.475-6.038c0-2.35-.825-4.35-2.475-6S14.367 3.5 12 3.5c-2.35 0-4.354.825-6.013 2.475S3.5 9.633 3.5 12c0 2.35.83 4.354 2.487 6.013S9.658 20.5 12.025 20.5z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgCirclePlus);
export default ForwardRef;
