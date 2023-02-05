import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const SvgTwitter = (
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
			d="M8.089 21.75c9.054 0 14.008-7.503 14.008-14.008 0-.211-.005-.427-.014-.638a10.003 10.003 0 0 0 2.456-2.549c-.898.4-1.85.66-2.827.774a4.95 4.95 0 0 0 2.166-2.723A9.898 9.898 0 0 1 20.752 3.8a4.93 4.93 0 0 0-8.394 4.49A13.985 13.985 0 0 1 2.211 3.15a4.93 4.93 0 0 0 1.524 6.57 4.93 4.93 0 0 1-2.23-.614v.06a4.922 4.922 0 0 0 3.95 4.829 4.895 4.895 0 0 1-2.222.084 4.934 4.934 0 0 0 4.598 3.422 9.875 9.875 0 0 1-7.293 2.037 13.969 13.969 0 0 0 7.55 2.212Z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgTwitter);
export default ForwardRef;
