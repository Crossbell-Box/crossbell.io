import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const SvgSync = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlSpace="preserve"
		viewBox="0 0 48 48"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<circle
			cx={24.4}
			cy={23.6}
			r={11.6}
			fill="currentColor"
			style={{
				opacity: 0.3,
			}}
		/>
		<path d="M7 27.5v-2.2c2.5 0 4.9-.5 7.1-1.4s4.1-2.2 5.8-3.9 2.9-3.6 3.9-5.8 1.4-4.6 1.4-7.1h2.2c0 2.8-.5 5.5-1.6 8s-2.5 4.6-4.4 6.5c-1.9 1.8-4 3.3-6.5 4.4-2.4.9-5.1 1.5-7.9 1.5zM7 21v-2.3c3.2 0 6-1.1 8.2-3.4s3.4-5 3.4-8.2H21c0 3.9-1.4 7.2-4.1 9.9s-6 4-9.9 4zm0-6.6V7h7.4c0 2-.7 3.8-2.2 5.2S9 14.4 7 14.4zM20.5 41c0-2.8.5-5.5 1.6-8s2.5-4.7 4.4-6.5c1.9-1.8 4-3.3 6.5-4.4 2.5-1.1 5.1-1.6 8-1.6v2.2c-2.5 0-4.9.5-7.1 1.4s-4.1 2.2-5.8 3.9-2.9 3.6-3.9 5.8-1.4 4.6-1.4 7.1h-2.3zm6.5 0c0-3.9 1.4-7.2 4.1-9.9s6-4.1 9.9-4.1v2.3c-3.2 0-6 1.1-8.2 3.4s-3.4 5-3.4 8.2H27zm6.6 0c0-2 .7-3.8 2.2-5.2s3.2-2.2 5.2-2.2V41h-7.4z" />
	</svg>
);
const ForwardRef = forwardRef(SvgSync);
export default ForwardRef;
