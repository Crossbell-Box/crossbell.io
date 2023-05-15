import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgLikeFilled = (
	props: SVGProps<SVGSVGElement>,
	ref: Ref<SVGSVGElement>
) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 18 18"
		ref={ref}
		{...props}
	>
		<path
			fill="currentColor"
			d="m9 15.731-.769-.694a84.743 84.743 0 0 1-3.281-3.14c-.862-.882-1.55-1.67-2.063-2.363-.512-.694-.871-1.322-1.078-1.884A4.923 4.923 0 0 1 1.5 5.944c0-1.125.378-2.066 1.134-2.822.757-.757 1.691-1.135 2.804-1.135a4 4 0 0 1 1.978.507C8.022 2.83 8.55 3.319 9 3.956c.525-.675 1.081-1.172 1.669-1.49a3.91 3.91 0 0 1 1.893-.479c1.113 0 2.047.378 2.804 1.135.756.756 1.134 1.697 1.134 2.822 0 .575-.103 1.143-.31 1.706-.206.562-.565 1.19-1.078 1.884-.512.694-1.2 1.481-2.062 2.363a84.707 84.707 0 0 1-3.281 3.14L9 15.731Z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgLikeFilled);
export default ForwardRef;
