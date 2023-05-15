import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgRisk = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 32 32"
		ref={ref}
		{...props}
	>
		<clipPath id="risk_svg__a">
			<path d="M0 0h32v32H0z" />
		</clipPath>
		<g clipPath="url(#risk_svg__a)">
			<path
				fill="#e53935"
				d="M26.667 5.334A2.668 2.668 0 0 0 24 2.667H8a2.668 2.668 0 0 0-2.667 2.667v21.333A2.668 2.668 0 0 0 8 29.334h16a2.668 2.668 0 0 0 2.667-2.667z"
			/>
			<path
				fill="#fff"
				d="M10.667 8H8V5.333h2.667zM24 5.333H13.333V8H24zm-8 5.333L8 25.333h16zM17.333 24h-2.666v-2.667h2.666zm-2.666-4v-4h2.666v4z"
				opacity={0.6}
			/>
		</g>
	</svg>
);
const ForwardRef = forwardRef(SvgRisk);
export default ForwardRef;
