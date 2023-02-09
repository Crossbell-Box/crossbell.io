import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const SvgCoinbaseWallet = (
	props: SVGProps<SVGSVGElement>,
	ref: Ref<SVGSVGElement>
) => (
	<svg
		width="1em"
		height="1em"
		viewBox="0 0 20 20"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		ref={ref}
		{...props}
	>
		<path fill="#0052FF" d="M0 0h20v20H0z" />
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM8.25 7.714a.536.536 0 0 0-.536.536v3.5c0 .296.24.536.536.536h3.5c.296 0 .536-.24.536-.536v-3.5a.536.536 0 0 0-.536-.536h-3.5Z"
			fill="#fff"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgCoinbaseWallet);
export default ForwardRef;
