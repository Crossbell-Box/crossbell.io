import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const SvgWidgets = (
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
			d="M19.2 36.4 14.5 26 4 21.2l10.4-4.8L19.2 6 24 16.5l10.5 4.8L24 26l-4.8 10.4zM36.4 42l-2.3-5.2-5.2-2.3 5.2-2.4 2.3-5.2 2.4 5.2 5.2 2.4-5.2 2.3-2.4 5.2z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgWidgets);
export default ForwardRef;
