import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgSettingsMyCharacter = (
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
		<g clipPath="url(#settings-my-character_svg__a)">
			<path
				fill="#5B89F7"
				d="M22 6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6Z"
			/>
			<path
				fill="#fff"
				d="M20 8h-6V6h6v2Zm0 4h-6v-2h6v2ZM4 15.75V17h10v-1.25C14 14.09 10.67 13 9 13s-5 1.09-5 2.75ZM6 9c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3Z"
				opacity={0.4}
			/>
		</g>
		<defs>
			<clipPath id="settings-my-character_svg__a">
				<path fill="#fff" d="M0 0h24v24H0z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgSettingsMyCharacter);
export default ForwardRef;
