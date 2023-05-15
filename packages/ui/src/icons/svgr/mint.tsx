import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgMint = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
			d="m24 28.8 2.5-5.4 5.3-2.4-5.4-2.5-2.4-5.3-2.5 5.3-5.3 2.5 5.4 2.5 2.4 5.3zM7 36c-.8 0-1.5-.3-2.1-.9-.6-.6-.9-1.3-.9-2.1V9c0-.8.3-1.5.9-2.1S6.2 6 7 6h34c.8 0 1.5.3 2.1.9.6.6.9 1.3.9 2.1v24c0 .8-.3 1.5-.9 2.1-.6.6-1.3.9-2.1.9H7zm0-3h34V9H7v24zm-5 9v-3h44v3H2zm5-9V9v24z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgMint);
export default ForwardRef;
