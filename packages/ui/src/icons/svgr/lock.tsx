import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgLock = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 24 24"
		ref={ref}
		{...props}
	>
		<g clipPath="url(#lock_svg__a)">
			<path
				fill="currentColor"
				d="M18 8h-1V6c0-1.729-1.045-5-5-5S7 4.271 7 6v2H6c-2 0-2 2-2 2v8s0 2 2 2h12s2 0 2-2v-8s0-2-2-2ZM9 8V6.005C9.006 5.503 9.177 3 12 3s2.994 2.503 3 3v2H9Z"
			/>
			<path
				fill="#fff"
				d="M17 8h-2V6c-.006-.497-.177-3-3-3S9.006 5.503 9 6.005V8H7V6c0-1.729 1.045-5 5-5s5 3.271 5 5v2Z"
				opacity={0.5}
			/>
		</g>
		<defs>
			<clipPath id="lock_svg__a">
				<path fill="#fff" d="M0 0h24v24H0z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgLock);
export default ForwardRef;
