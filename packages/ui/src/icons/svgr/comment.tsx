import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const SvgComment = (
	props: SVGProps<SVGSVGElement>,
	ref: Ref<SVGSVGElement>
) => (
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
			d="M12 28h15.6v-3H12v3zm0-6.5h24v-3H12v3zm0-6.5h24v-3H12v3zM4 44V7c0-.8.3-1.5.9-2.1S6.2 4 7 4h34c.8 0 1.5.3 2.1.9.6.6.9 1.3.9 2.1v26c0 .8-.3 1.5-.9 2.1-.6.6-1.3.9-2.1.9H12l-8 8zm3-7.2 3.8-3.8H41V7H7v29.8zM7 7v29.8V7z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgComment);
export default ForwardRef;
