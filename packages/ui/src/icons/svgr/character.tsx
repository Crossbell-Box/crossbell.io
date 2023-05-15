import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgCharacter = (
	props: SVGProps<SVGSVGElement>,
	ref: Ref<SVGSVGElement>
) => (
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
			d="M20.4 5.6h7.2v12.6h-7.2z"
			style={{
				opacity: 0.3,
			}}
		/>
		<path d="M28.4 26.8h8.5v-2.5h-8.5v2.5zm0 5.6h8.5v-2.5h-8.5v2.5zm1.1-18.7h11.4c.9 0 1.7.3 2.4 1s1 1.5 1 2.4v23.8c0 .9-.3 1.7-1 2.4s-1.5 1-2.4 1H7.1c-.9 0-1.7-.3-2.4-1s-1-1.5-1-2.4V17.1c0-.9.3-1.7 1-2.4s1.5-1 2.4-1h11.4V7c0-.9.3-1.6 1-2.3s1.4-1 2.3-1h4.4c.9 0 1.6.3 2.3 1s1 1.4 1 2.3v6.7zm-7.5 3h4.1V7.1H22v9.6zm2 12.7zm-6.3.5c.8 0 1.4-.3 1.9-.8s.8-1.2.8-1.9a2.732 2.732 0 0 0-2.7-2.7 2.732 2.732 0 0 0-2.7 2.7c0 .8.3 1.4.8 1.9s1.2.8 1.9.8zm-6.1 5.9h11.9V35c0-.6-.1-1.1-.4-1.6s-.7-.8-1.1-1c-1.1-.4-1.9-.6-2.5-.7-.6-.1-1.2-.2-1.8-.2-.6 0-1.3.1-2 .2s-1.5.4-2.4.7c-.5.2-.9.5-1.2 1-.3.5-.4 1-.4 1.6v.8zm6.9-18.7H7.1v23.8h33.8V17.1H29.5c0 .9-.3 1.7-1 2.2-.6.5-1.4.8-2.4.8h-4.3c-.9 0-1.7-.3-2.3-.8-.6-.5-1-1.3-1-2.2z" />
	</svg>
);
const ForwardRef = forwardRef(SvgCharacter);
export default ForwardRef;
