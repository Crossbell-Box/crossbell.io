import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgBack = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlSpace="preserve"
		viewBox="0 0 48 48"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path
			fill="currentColor"
			d="M20 44 0 24 20 4l2.8 2.8L5.7 24l17.1 17.2L20 44z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgBack);
export default ForwardRef;
