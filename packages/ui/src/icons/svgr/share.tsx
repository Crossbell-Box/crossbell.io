import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const SvgShare = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 48 48"
		xmlSpace="preserve"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path
			fill="currentColor"
			d="M11 46c-.8 0-1.5-.3-2.1-.9-.6-.6-.9-1.3-.9-2.1V17.5c0-.8.3-1.5.9-2.1.6-.6 1.3-.9 2.1-.9h8.5v3H11V43h26V17.5h-8.5v-3H37c.8 0 1.5.3 2.1.9.6.6.9 1.3.9 2.1V43c0 .8-.3 1.5-.9 2.1-.6.6-1.3.9-2.1.9H11zm11.5-15.4V7.8l-4.4 4.4-2.1-2.1L24 2l8 8.1-2.1 2.2-4.4-4.4v22.9l-3-.2z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgShare);
export default ForwardRef;
