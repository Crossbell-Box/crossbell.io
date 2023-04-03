import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const SvgCheckCircleFill = (
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
		<g clipPath="url(#check-circle-fill_svg__a)">
			<circle cx={12} cy={12} r={12} fill="currentColor" />
			<path
				fill="#fff"
				d="m9.45 17.85-5.6-5.6 1.075-1.075L9.45 15.7l9.6-9.6 1.075 1.075L9.45 17.85Z"
			/>
		</g>
		<defs>
			<clipPath id="check-circle-fill_svg__a">
				<path fill="#fff" d="M0 0h24v24H0z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgCheckCircleFill);
export default ForwardRef;
