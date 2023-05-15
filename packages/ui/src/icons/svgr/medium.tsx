import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgMedium = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 12 12"
		ref={ref}
		{...props}
	>
		<path
			fill="currentColor"
			d="M6.769 5.914c0 1.885-1.516 3.414-3.385 3.414C1.515 9.328 0 7.798 0 5.914 0 4.029 1.515 2.5 3.384 2.5c1.87 0 3.385 1.528 3.385 3.414ZM10.481 5.913c0 1.775-.757 3.214-1.692 3.214-.934 0-1.692-1.44-1.692-3.214 0-1.775.757-3.214 1.692-3.214.935 0 1.692 1.439 1.692 3.214M12 5.914c0 1.59-.266 2.88-.595 2.88-.329 0-.595-1.29-.595-2.88 0-1.59.266-2.879.595-2.879.329 0 .595 1.29.595 2.88Z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgMedium);
export default ForwardRef;
