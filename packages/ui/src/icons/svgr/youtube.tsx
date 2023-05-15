import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgYoutube = (
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
		<g clipPath="url(#youtube_svg__a)">
			<path
				fill="#F2F2F2"
				d="M24.3 7.2s-.235-1.655-.957-2.381c-.914-.956-1.936-.961-2.404-1.017-3.357-.244-8.396-.244-8.396-.244h-.01s-5.038 0-8.395.244c-.468.056-1.49.06-2.404 1.017C1.012 5.545.782 7.2.782 7.2S.538 9.145.538 11.086v1.819c0 1.94.24 3.886.24 3.886s.234 1.654.951 2.38c.914.957 2.114.924 2.649 1.027 1.921.183 8.16.24 8.16.24s5.044-.01 8.4-.249c.47-.056 1.491-.06 2.405-1.017.722-.727.956-2.381.956-2.381s.24-1.941.24-3.886v-1.819c0-1.94-.24-3.886-.24-3.886Zm-14.241 7.913V8.367l6.483 3.385-6.483 3.36Z"
			/>
		</g>
		<defs>
			<clipPath id="youtube_svg__a">
				<path fill="currentColor" d="M.538 0h24v24h-24z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgYoutube);
export default ForwardRef;
