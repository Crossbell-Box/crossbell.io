import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const SvgSettingsXSync = (
	props: SVGProps<SVGSVGElement>,
	ref: Ref<SVGSVGElement>
) => (
	<svg
		width="1em"
		height="1em"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		ref={ref}
		{...props}
	>
		<g clipPath="url(#settings-x-sync_svg__a)">
			<path
				d="M22 16c0 3.31-2.69 6-6 6-2.22 0-4.16-1.21-5.2-3.01-.1.01-.2.01-.3.01C5.81 19 2 15.19 2 10.5 2 5.81 5.81 2 10.5 2c4.69 0 8.5 3.81 8.5 8.5 0 .1 0 .2-.01.3A6.001 6.001 0 0 1 22 16Z"
				fill="#5B89F7"
			/>
			<path
				opacity={0.4}
				d="M19 10.5c0 .1 0 .2-.01.3-.88-.51-1.9-.8-2.99-.8-3.31 0-6 2.69-6 6 0 1.09.29 2.11.8 2.99-.1.01-.2.01-.3.01C5.81 19 2 15.19 2 10.5 2 5.81 5.81 2 10.5 2c4.69 0 8.5 3.81 8.5 8.5Z"
				fill="#fff"
			/>
		</g>
		<defs>
			<clipPath id="settings-x-sync_svg__a">
				<path fill="#fff" d="M0 0h24v24H0z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgSettingsXSync);
export default ForwardRef;
