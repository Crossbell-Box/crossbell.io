import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgSettingsSwitchApp = (
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
		<path
			fill="#687792"
			d="M21 19.072A1.929 1.929 0 0 1 19.071 21h-3.857a1.929 1.929 0 0 1-1.928-1.928v-3.858c0-1.065.863-1.928 1.928-1.928h3.857c1.066 0 1.929.863 1.929 1.928v3.857Zm-10.286-3.858a1.928 1.928 0 0 0-1.928-1.928H4.929A1.929 1.929 0 0 0 3 15.214v3.857c0 1.066.864 1.93 1.929 1.93h3.857a1.928 1.928 0 0 0 1.928-1.93v-3.857ZM21 4.93A1.928 1.928 0 0 0 19.071 3h-3.857a1.928 1.928 0 0 0-1.928 1.929v3.857c0 1.065.863 1.928 1.928 1.928h3.857A1.928 1.928 0 0 0 21 8.786V4.929Zm-10.286 0A1.928 1.928 0 0 0 8.786 3H4.929A1.929 1.929 0 0 0 3 4.93v3.857c0 1.065.864 1.928 1.929 1.928h3.857a1.928 1.928 0 0 0 1.928-1.928V4.929Z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgSettingsSwitchApp);
export default ForwardRef;
