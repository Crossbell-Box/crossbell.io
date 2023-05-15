import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgGear = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 24 24"
		ref={ref}
		{...props}
	>
		<g clipPath="url(#gear_svg__a)">
			<path
				fill="currentColor"
				fillRule="evenodd"
				d="M9.526 1.182 8.732 3.23 6 4.78 3.822 4.45a1.846 1.846 0 0 0-1.846.905l-.739 1.292a1.846 1.846 0 0 0 .148 2.086l1.384 1.717v3.102l-1.347 1.717a1.846 1.846 0 0 0-.148 2.086l.738 1.292a1.845 1.845 0 0 0 1.847.905l2.178-.332 2.695 1.55.794 2.05A1.845 1.845 0 0 0 11.243 24h1.551a1.845 1.845 0 0 0 1.717-1.181l.794-2.05L18 19.22l2.179.332a1.845 1.845 0 0 0 1.846-.905l.738-1.292a1.846 1.846 0 0 0-.148-2.086l-1.384-1.717v-3.102l1.348-1.717a1.847 1.847 0 0 0 .147-2.086l-.738-1.292a1.846 1.846 0 0 0-1.846-.905l-2.179.333-2.695-1.551-.794-2.05A1.846 1.846 0 0 0 12.757 0h-1.514a1.846 1.846 0 0 0-1.717 1.182ZM12 15.857a3.857 3.857 0 1 0 0-7.714 3.857 3.857 0 0 0 0 7.714Z"
				clipRule="evenodd"
			/>
		</g>
		<defs>
			<clipPath id="gear_svg__a">
				<path fill="#fff" d="M0 0h24v24H0z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgGear);
export default ForwardRef;
