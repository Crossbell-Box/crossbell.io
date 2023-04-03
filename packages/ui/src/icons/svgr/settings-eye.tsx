import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const SvgSettingsEye = (
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
		<g clipPath="url(#settings-eye_svg__a)">
			<path
				fill="#808ABF"
				d="M11.505 10C12.887 10 14 11.294 14 12.675 14 14.054 12.887 15 11.505 15A2.503 2.503 0 0 1 9 12.5c0-1.381 1.123-2.5 2.505-2.5ZM22 12.5s-2.655-6.91-9.645-7.448A7.773 7.773 0 0 0 11.5 5c-.29 0-.574.021-.855.052C3.655 5.59 1 12.5 1 12.5s2.655 6.91 9.645 7.447c.281.032.565.053.855.053.29 0 .574-.021.855-.053C19.345 19.41 22 12.5 22 12.5Zm-15 0C7 10.02 9.02 8 11.5 8s4.5 2.02 4.5 4.5-2.02 4.5-4.5 4.5S7 14.98 7 12.5Z"
			/>
			<path
				fill="#fff"
				d="M11.5 5C7.36 5 4 8.36 4 12.5c0 4.14 3.36 7.5 7.5 7.5 4.14 0 7.5-3.36 7.5-7.5C19 8.36 15.64 5 11.5 5Zm0 12C9.02 17 7 14.98 7 12.5S9.02 8 11.5 8s4.5 2.02 4.5 4.5-2.02 4.5-4.5 4.5Z"
				opacity={0.4}
			/>
		</g>
		<defs>
			<clipPath id="settings-eye_svg__a">
				<path fill="#fff" d="M0 0h24v24H0z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgSettingsEye);
export default ForwardRef;
