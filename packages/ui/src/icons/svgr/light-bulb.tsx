import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgLightBulb = (
	props: SVGProps<SVGSVGElement>,
	ref: Ref<SVGSVGElement>
) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 25 24"
		ref={ref}
		{...props}
	>
		<path
			fill="currentColor"
			d="M12.333 2A6.344 6.344 0 0 0 6 8.333c0 2.065.994 3.908 2.533 5.067v5.067S9.167 21 12.333 21c3.167 0 3.8-2.533 3.8-2.533V13.4a6.337 6.337 0 0 0 2.534-5.067A6.344 6.344 0 0 0 12.333 2zm0 17.733c-1.558 0-2.204-.791-2.444-1.266h4.882c-.234.456-.886 1.266-2.438 1.266zm2.534-2.533H9.8v-2.533h5.067zm-2.534-3.8a5.073 5.073 0 0 1-5.066-5.067 5.073 5.073 0 0 1 5.066-5.066A5.073 5.073 0 0 1 17.4 8.333a5.073 5.073 0 0 1-5.067 5.067z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgLightBulb);
export default ForwardRef;
