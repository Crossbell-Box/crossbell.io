import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const SvgWidgetsSetting = (
	props: SVGProps<SVGSVGElement>,
	ref: Ref<SVGSVGElement>
) => (
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
			d="m20 43-.9-6c-.7-.2-1.4-.6-2.2-1-.8-.5-1.5-.9-2-1.4l-5.6 2.5-4-7 5.1-3.8c-.1-.3-.1-.7-.2-1.1 0-.4-.1-.8-.1-1.2 0-.3 0-.7.1-1.1 0-.4.1-.8.2-1.2L5.3 18l4-7 5.6 2.5c.6-.5 1.3-1 2-1.4.8-.4 1.5-.8 2.2-1L20 5h8l.9 6.1c.7.3 1.5.6 2.2 1 .8.4 1.4.9 2 1.4l5.7-2.5 4 7-5.1 3.7c.1.4.1.8.2 1.2v2.2c0 .4-.1.8-.2 1.2l5.1 3.7-4 7-5.8-2.5c-.6.5-1.3 1-2 1.4-.7.5-1.5.8-2.2 1L28 43h-8zm4-13.4c1.6 0 2.9-.5 4-1.6s1.6-2.4 1.6-4-.5-2.9-1.6-4-2.4-1.6-4-1.6-2.9.5-4 1.6-1.7 2.4-1.7 4 .6 2.9 1.7 4 2.4 1.6 4 1.6z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgWidgetsSetting);
export default ForwardRef;
