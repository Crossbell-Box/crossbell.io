import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const SvgExit = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 16 16"
		ref={ref}
		{...props}
	>
		<path
			stroke="#000"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.143}
			d="M10.857 12v2.287a1.143 1.143 0 0 1-1.143 1.142h-8a1.143 1.143 0 0 1-1.143-1.142V1.715A1.143 1.143 0 0 1 1.714.572h8a1.143 1.143 0 0 1 1.143 1.143v2.286M7.428 8h8M13.143 5.715 15.428 8l-2.285 2.285"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgExit);
export default ForwardRef;
