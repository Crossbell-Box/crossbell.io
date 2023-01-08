import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const SvgEyeClose = (
	props: SVGProps<SVGSVGElement>,
	ref: Ref<SVGSVGElement>
) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 16 16"
		ref={ref}
		{...props}
	>
		<g stroke="currentColor" strokeLinejoin="round">
			<path
				strokeLinecap="round"
				strokeWidth={1.143}
				d="M15.12 7.234a1.143 1.143 0 0 1 0 1.532c-1.2 1.291-3.931 3.806-7.12 3.806S2.08 10.057.88 8.766a1.143 1.143 0 0 1 0-1.532C2.08 5.943 4.811 3.43 8 3.43s5.92 2.514 7.12 3.805z"
			/>
			<path
				strokeLinecap="round"
				strokeWidth={1.143}
				d="M9.849 9.232A2.286 2.286 0 1 1 6.616 6"
			/>
			<path d="m3 2 12 12" />
		</g>
	</svg>
);
const ForwardRef = forwardRef(SvgEyeClose);
export default ForwardRef;
