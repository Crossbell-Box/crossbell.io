import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const SvgXLogLogo = (
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
		<g clipPath="url(#x-log-logo_svg__a)">
			<path
				fill="#000"
				d="M10.494 18.72c0 2.977-2.206 5.144-5.19 5.144-2.982 0-5.242-2.167-5.242-5.144 0-2.978 2.204-5.115 5.231-5.115 3.028 0 5.2 2.167 5.2 5.115ZM22.358 18.867v3.598c-.907.862-2.403 1.416-4.033 1.416-3.416 0-5.59-1.955-5.59-4.975 0-3.02 2.407-5.28 5.789-5.28v5.24h3.834Z"
			/>
			<path
				fill="url(#x-log-logo_svg__b)"
				d="M22.303 4.002 24 7.175l-8.485 4.54-4.794-8.96L15.869 0l3.097 5.787 3.337-1.785Z"
			/>
			<path
				fill="#000"
				d="m0 11.759 3.082-5.644L.127 1.522H10.43L7.475 6.115l3.08 5.644H0Z"
			/>
		</g>
		<defs>
			<linearGradient
				id="x-log-logo_svg__b"
				x1={10.721}
				x2={24}
				y1={5.858}
				y2={5.858}
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#FF4D4D" />
				<stop offset={0.99} stopColor="#F9CB28" />
			</linearGradient>
			<clipPath id="x-log-logo_svg__a">
				<path fill="#fff" d="M0 0h24v24H0z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgXLogLogo);
export default ForwardRef;
