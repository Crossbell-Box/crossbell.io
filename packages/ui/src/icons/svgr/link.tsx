import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgLink = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
			fill="#A6A69F"
			d="M11.585 21.72a4.506 4.506 0 0 1-6.147 1.647A4.505 4.505 0 0 1 3.79 17.22l1.875-3.248a4.505 4.505 0 0 1 6.147-1.647 4.506 4.506 0 0 1 1.648 6.147l-1.875 3.248Zm-3.321-6.248L6.389 18.72a1.5 1.5 0 0 0 2.598 1.5l1.874-3.248a1.5 1.5 0 0 0-2.597-1.5Zm10.07-5.444a4.505 4.505 0 0 1-6.146 1.647 4.505 4.505 0 0 1-1.648-6.147l1.876-3.248A4.505 4.505 0 0 1 18.561.633 4.505 4.505 0 0 1 20.21 6.78l-1.876 3.248Zm-3.32-6.247-1.876 3.248a1.5 1.5 0 0 0 2.598 1.5l1.876-3.248a1.5 1.5 0 0 0-2.598-1.5Z"
		/>
		<path
			fill="#fff"
			d="M15.014 3.78a3.294 3.294 0 0 1 4.494-1.203c.55.318.972.773 1.251 1.297a4.49 4.49 0 0 0-2.197-3.24 4.505 4.505 0 0 0-6.147 1.647L3.79 17.22a4.503 4.503 0 0 0 .48 5.169L15.014 3.781Z"
			opacity={0.3}
		/>
		<path
			fill="#A6A69F"
			d="M10.861 16.972a1.5 1.5 0 0 1-2.597-1.5l4.875-8.444a1.5 1.5 0 0 1 2.598 1.5l-4.876 8.444Z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgLink);
export default ForwardRef;
