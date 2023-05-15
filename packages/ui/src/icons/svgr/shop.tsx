import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgShop = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlSpace="preserve"
		viewBox="0 0 48 48"
		width="1em"
		height="1em"
		ref={ref}
		{...props}
	>
		<path
			fill="currentColor"
			d="M7.9 13.8h31.7v13.8H7.9z"
			style={{
				opacity: 0.3,
			}}
		/>
		<path d="M38.1 43H9.9c-.8 0-1.5-.3-2-.8-.6-.6-.9-1.3-.9-2.1V15.5c0-.8.3-1.4.8-2s1.2-.9 2-.9h5.5c0-2.4.8-4.4 2.4-6.1 1.6-1.7 3.6-2.5 6-2.5s4.5.8 6.2 2.5c1.8 1.7 2.6 3.7 2.6 6.1h5.4c.8 0 1.5.3 2.1.9.6.6.8 1.2.8 2v24.6c0 .8-.3 1.5-.8 2.1-.4.5-1.1.8-1.9.8zM17.6 12.6h12.7c0-1.8-.6-3.3-1.9-4.5S25.8 6.2 24 6.2s-3.3.6-4.5 1.9-1.9 2.7-1.9 4.5zm20.5 28.2c.2 0 .3-.1.5-.2.1-.1.2-.3.2-.5V15.5c0-.1-.1-.3-.2-.4-.1-.1-.3-.2-.5-.2H9.9c-.2 0-.3.1-.4.2s-.2.3-.2.4v24.6c0 .2.1.3.2.5.1.1.3.2.4.2h28.2zM24 25.9c2.4 0 4.5-.9 6.2-2.6 1.7-1.7 2.6-3.8 2.6-6.2h-2.3c0 1.8-.6 3.3-1.9 4.6-1.3 1.3-2.8 1.9-4.6 1.9s-3.3-.6-4.6-1.9c-1.3-1.3-1.9-2.8-1.9-4.6h-2.3c0 2.4.9 4.5 2.6 6.2s3.8 2.6 6.2 2.6zm-14.8-11V40.8 14.9z" />
	</svg>
);
const ForwardRef = forwardRef(SvgShop);
export default ForwardRef;
