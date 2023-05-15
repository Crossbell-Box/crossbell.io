import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgArgentWallet = (
	props: SVGProps<SVGSVGElement>,
	ref: Ref<SVGSVGElement>
) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		aria-hidden="true"
		viewBox="0 0 32 32"
		ref={ref}
		{...props}
	>
		<path fill="#fff" d="M0 0h32v32H0z" />
		<path
			fill="#f36a3d"
			d="M18.324 7.636h-4.672a.29.29 0 0 0-.285.291c-.094 4.53-2.39 8.829-6.342 11.874a.3.3 0 0 0-.062.409l2.734 3.902a.28.28 0 0 0 .402.065c2.47-1.891 4.458-4.173 5.889-6.702 1.431 2.529 3.419 4.81 5.89 6.702a.28.28 0 0 0 .401-.065l2.734-3.902a.301.301 0 0 0-.062-.41c-3.952-3.044-6.248-7.343-6.342-11.873a.29.29 0 0 0-.285-.29Z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgArgentWallet);
export default ForwardRef;
