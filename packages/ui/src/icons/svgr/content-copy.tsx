import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const SvgContentCopy = (
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
			d="M3 14.65c-.267 0-.5-.1-.7-.3s-.3-.433-.3-.7V3.6h1v10.05h7.9v1zm2-2c-.267 0-.5-.1-.7-.3s-.3-.433-.3-.7V2.317c0-.267.1-.5.3-.7s.433-.3.7-.3h7.333c.267 0 .5.1.7.3s.3.433.3.7v9.333c0 .267-.1.5-.3.7s-.433.3-.7.3zm0-1h7.333V2.317H5zm0 0V2.317z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgContentCopy);
export default ForwardRef;
