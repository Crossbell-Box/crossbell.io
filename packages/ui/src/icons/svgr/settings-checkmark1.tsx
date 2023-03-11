import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const SvgSettingsCheckmark1 = (
	props: SVGProps<SVGSVGElement>,
	ref: Ref<SVGSVGElement>
) => (
	<svg
		width="1em"
		height="1em"
		viewBox="0 0 32 32"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		ref={ref}
		{...props}
	>
		<g clipPath="url(#settings-checkmark1_svg__a)">
			<path
				d="M26.305 5.924 13.333 18.896 6.437 12l-3.77 3.77 10.666 10.667L30.076 9.695l-3.77-3.771Z"
				fill="#4DAF4F"
			/>
			<path
				opacity={0.3}
				d="M30.081 9.693 13.333 26.44v-7.547L26.307 5.92l3.774 3.773Z"
				fill="#fff"
			/>
		</g>
		<defs>
			<clipPath id="settings-checkmark1_svg__a">
				<path fill="#fff" d="M0 0h32v32H0z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgSettingsCheckmark1);
export default ForwardRef;
