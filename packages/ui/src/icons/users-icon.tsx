import React from "react";

export const UsersIcon = React.forwardRef<
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
		<path
			d="M5.71425 6.8572C7.13441 6.8572 8.28568 5.70593 8.28568 4.28577C8.28568 2.86561 7.13441 1.71434 5.71425 1.71434C4.29409 1.71434 3.14282 2.86561 3.14282 4.28577C3.14282 5.70593 4.29409 6.8572 5.71425 6.8572Z"
			stroke="black"
			strokeWidth="1.14286"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M10.8571 15.4286H0.571411V14.2858C0.571411 12.9218 1.11325 11.6137 2.07772 10.6492C3.04219 9.68475 4.3503 9.14291 5.71427 9.14291C7.07824 9.14291 8.38634 9.68475 9.35082 10.6492C10.3153 11.6137 10.8571 12.9218 10.8571 14.2858V15.4286Z"
			stroke="black"
			strokeWidth="1.14286"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M10.2857 1.71434C10.9677 1.71434 11.6217 1.98526 12.104 2.46749C12.5862 2.94973 12.8571 3.60378 12.8571 4.28577C12.8571 4.96775 12.5862 5.62181 12.104 6.10404C11.6217 6.58628 10.9677 6.8572 10.2857 6.8572"
			stroke="black"
			strokeWidth="1.14286"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M12.1143 9.36006C13.0878 9.7304 13.9259 10.3876 14.5177 11.2447C15.1096 12.1019 15.4272 13.1185 15.4285 14.1601V15.4286H13.7143"
			stroke="black"
			strokeWidth="1.14286"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
));
