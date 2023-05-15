import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgRefreshFilled = (
	props: SVGProps<SVGSVGElement>,
	ref: Ref<SVGSVGElement>
) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 32 32"
		ref={ref}
		{...props}
	>
		<path
			fill="currentColor"
			fillRule="evenodd"
			d="M32 16c0 8.837-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0s16 7.163 16 16Zm-7.5-7.257c.583 0 1.056.473 1.056 1.056v4.8c0 .584-.473 1.057-1.056 1.057h-4.8a1.056 1.056 0 0 1 0-2.113h2.138L20.07 11.88a6.145 6.145 0 1 0 .137 8.5 1.056 1.056 0 1 1 1.549 1.435 8.257 8.257 0 1 1-.227-11.463l1.914 1.802V9.8c0-.583.473-1.056 1.056-1.056Z"
			clipRule="evenodd"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgRefreshFilled);
export default ForwardRef;
