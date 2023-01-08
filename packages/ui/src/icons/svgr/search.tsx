import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const SvgSearch = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
			d="m39.5 41.1-13-12.9c-1 .9-2.2 1.5-3.5 2s-2.7.7-4.1.7c-3.4 0-6.3-1.2-8.6-3.5s-3.5-5.2-3.5-8.6c0-3.3 1.2-6.2 3.5-8.5s5.2-3.5 8.6-3.5 6.2 1.2 8.6 3.5 3.5 5.2 3.5 8.5c0 1.4-.2 2.8-.7 4.1-.5 1.3-1.2 2.5-2.1 3.6l13 13-1.7 1.6zM19 28.6c2.7 0 5-1 6.9-2.9 1.9-1.9 2.9-4.2 2.9-7 0-2.7-1-5-2.9-6.9C23.9 9.9 21.6 9 19 9c-2.8 0-5.1.9-7 2.9s-2.8 4.2-2.8 6.9.9 5.1 2.8 7 4.2 2.8 7 2.8z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgSearch);
export default ForwardRef;
