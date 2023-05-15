import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgFavoriteFill = (
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
			d="m12 20.975-1.025-.925c-2.717-2.483-4.892-4.65-6.525-6.5C2.817 11.7 2 9.825 2 7.925c0-1.5.504-2.754 1.513-3.762C4.52 3.155 5.767 2.65 7.25 2.65c.85 0 1.692.205 2.525.613.833.408 1.575 1.08 2.225 2.012.733-.933 1.492-1.604 2.275-2.012a5.282 5.282 0 0 1 2.475-.613c1.483 0 2.73.505 3.738 1.513S22 6.425 22 7.925c0 1.9-.817 3.775-2.45 5.625-1.633 1.85-3.808 4.017-6.525 6.5L12 20.975Z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgFavoriteFill);
export default ForwardRef;
