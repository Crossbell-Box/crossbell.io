import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const SvgMintFill = (
	props: SVGProps<SVGSVGElement>,
	ref: Ref<SVGSVGElement>
) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 25 24"
		ref={ref}
		{...props}
	>
		<path
			fill="currentColor"
			d="m12.5 14.4 1.225-2.675L16.4 10.5l-2.675-1.225L12.5 6.6l-1.225 2.675L8.6 10.5l2.675 1.225L12.5 14.4ZM4 18c-.4 0-.75-.15-1.05-.45-.3-.3-.45-.65-.45-1.05v-12c0-.4.15-.75.45-1.05C3.25 3.15 3.6 3 4 3h17c.4 0 .75.15 1.05.45.3.3.45.65.45 1.05v12c0 .4-.15.75-.45 1.05-.3.3-.65.45-1.05.45H4Zm-2.5 3v-1.5h22V21h-22Z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgMintFill);
export default ForwardRef;
