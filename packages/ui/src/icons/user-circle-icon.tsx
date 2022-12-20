import React from "react";

export const UserCircleIcon = React.forwardRef<
	SVGSVGElement,
	React.SVGAttributes<SVGSVGElement>
>((props, ref) => (
	<svg
		width="1em"
		height="1em"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
		ref={ref}
	>
		<circle cx="12" cy="12" r="12" fill="currentColor" />
		<g clipPath="url(#clip0_5300_18974)">
			<path
				d="M11.925 11.9996C13.8424 11.9996 15.3964 10.4552 15.3964 8.54961C15.3964 6.64402 13.8424 5.09961 11.925 5.09961C10.0076 5.09961 8.45355 6.64402 8.45355 8.54961C8.45355 10.4552 10.0076 11.9996 11.925 11.9996ZM14.355 12.8621H13.9021C13.3 13.137 12.6301 13.2934 11.925 13.2934C11.2198 13.2934 10.5527 13.137 9.94789 12.8621H9.49498C7.48263 12.8621 5.84998 14.4847 5.84998 16.4846V17.6059C5.84998 18.3201 6.43307 18.8996 7.15176 18.8996H16.6982C17.4169 18.8996 18 18.3201 18 17.6059V16.4846C18 14.4847 16.3673 12.8621 14.355 12.8621Z"
				fill="white"
			/>
		</g>
		<defs>
			<clipPath id="clip0_5300_18974">
				<rect
					width="12.15"
					height="13.8"
					fill="white"
					transform="translate(5.84998 5.09961)"
				/>
			</clipPath>
		</defs>
	</svg>
));
