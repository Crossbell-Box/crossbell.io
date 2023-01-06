import React from "react";

export const BellIcon = React.forwardRef<
	SVGSVGElement,
	React.SVGAttributes<SVGSVGElement>
>((props, ref) => (
	<svg
		width="1em"
		height="1em"
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		ref={ref}
		{...props}
	>
		<g clipPath="url(#clip0_5341_20477)">
			<path
				d="M6.48828 14.2378C6.77724 14.7765 7.34584 15.143 8 15.143C8.65417 15.143 9.22275 14.7765 9.51172 14.2378"
				stroke="black"
				strokeWidth="1.14286"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M4.87133 2.15315C5.70112 1.32337 6.82654 0.857201 8.00004 0.857201C9.17353 0.857201 10.2989 1.32337 11.1287 2.15315C11.9585 2.98294 12.4247 4.10837 12.4247 5.28186C12.4247 5.97233 12.5386 6.62113 12.7101 7.28476C12.7581 7.43498 12.811 7.57674 12.8679 7.71048C13.133 8.33422 13.8631 8.54705 14.4079 8.95033C15.221 9.5523 15.0638 10.8403 14.3874 11.3404C14.3874 11.3404 13.2954 12.2858 8.00004 12.2858C2.70457 12.2858 1.61259 11.3404 1.61259 11.3404C0.936266 10.8403 0.779062 9.5523 1.59218 8.95033C2.13692 8.54705 2.86698 8.33426 3.1322 7.71054C3.39657 7.08882 3.57538 6.29351 3.57538 5.28186C3.57538 4.10837 4.04155 2.98294 4.87133 2.15315Z"
				stroke="black"
				strokeWidth="1.14286"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</g>
		<defs>
			<clipPath id="clip0_5341_20477">
				<rect width="16" height="16" fill="white" />
			</clipPath>
		</defs>
	</svg>
));
