import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const SvgHouseFill = (
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
			d="M21.5 10.828V19.5a1.509 1.509 0 0 1-.787 1.322c-.218.12-.464.181-.713.178h-4.5a.75.75 0 0 1-.75-.75v-4.5A.75.75 0 0 0 14 15h-3a.75.75 0 0 0-.75.75v4.5a.75.75 0 0 1-.75.75H5a1.49 1.49 0 0 1-1.125-.506 1.584 1.584 0 0 1-.375-1.032v-8.634a1.5 1.5 0 0 1 .488-1.106l7.5-6.816a1.5 1.5 0 0 1 2.025 0l7.5 6.816a1.5 1.5 0 0 1 .487 1.106z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgHouseFill);
export default ForwardRef;
