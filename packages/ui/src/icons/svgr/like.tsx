import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgLike = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
			d="m24 42-2-1.8c-5.4-5-9.8-9.3-13.1-13S4 19.7 4 15.9c0-3 1-5.5 3-7.5s4.5-3 7.5-3c1.7 0 3.4.4 5 1.2s3.1 2.2 4.5 4c1.5-1.9 3-3.2 4.5-4s3.2-1.2 5-1.2c3 0 5.5 1 7.5 3s3 4.5 3 7.5c0 3.8-1.6 7.5-4.9 11.2s-7.6 8-13 13L24 42zm0-4c5.1-4.7 9.2-8.7 12.3-12.1 3.1-3.4 4.7-6.8 4.7-10 0-2.2-.7-4-2.1-5.4s-3.2-2.1-5.4-2.1c-1.7 0-3.2.5-4.7 1.6-1.5 1-2.7 2.5-3.6 4.4h-2.5c-.9-1.9-2.1-3.4-3.6-4.4-1.5-1-3-1.6-4.7-1.6-2.2 0-4 .7-5.4 2.1s-2 3.2-2 5.4c0 3.2 1.6 6.6 4.7 10S18.9 33.3 24 38z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgLike);
export default ForwardRef;
