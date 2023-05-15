import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgArrowCirclepath = (
	props: SVGProps<SVGSVGElement>,
	ref: Ref<SVGSVGElement>
) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 16 16"
		ref={ref}
		{...props}
	>
		<path
			fill="currentColor"
			d="M2.783 13.334v-1H4.95l-.25-.2c-.711-.567-1.228-1.184-1.55-1.85-.322-.667-.483-1.411-.483-2.234 0-1.177.347-2.236 1.041-3.175A5.293 5.293 0 0 1 6.45 2.934v1.033c-.833.322-1.506.858-2.017 1.608S3.667 7.15 3.667 8.05c0 .7.13 1.309.391 1.825s.614.964 1.059 1.342l.5.35V9.5h1v3.834zm6.784-.25v-1.05a4.142 4.142 0 0 0 2.016-1.609c.5-.75.75-1.575.75-2.475 0-.533-.13-1.075-.391-1.625s-.603-1.036-1.025-1.458l-.484-.433V6.5h-1V2.667h3.834v1h-2.184l.25.233c.667.623 1.167 1.29 1.5 2 .334.711.5 1.395.5 2.05a5.27 5.27 0 0 1-1.033 3.184 5.234 5.234 0 0 1-2.733 1.95z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgArrowCirclepath);
export default ForwardRef;
