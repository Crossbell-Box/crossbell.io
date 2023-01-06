import React from "react";

export const ExportIcon = React.forwardRef<
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
		<g clipPath="url(#clip0_5340_20288)">
			<path
				d="M2.18283 10.8572L0.69712 13.7715C0.596814 13.9452 0.544006 14.1423 0.544006 14.3429C0.544006 14.5435 0.596814 14.7406 0.69712 14.9144C0.802077 15.0824 0.948914 15.2203 1.12322 15.3144C1.29754 15.4086 1.49333 15.4558 1.69141 15.4515H14.2628C14.4609 15.4558 14.6567 15.4086 14.831 15.3144C15.0053 15.2203 15.1522 15.0824 15.2571 14.9144C15.3574 14.7406 15.4102 14.5435 15.4102 14.3429C15.4102 14.1423 15.3574 13.9452 15.2571 13.7715L13.8171 10.8572H2.18283Z"
				stroke="black"
				strokeWidth="1.14286"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M5.71423 5.14291L7.99995 7.42863L10.2857 5.14291"
				stroke="black"
				strokeWidth="1.14286"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M8 7.42863V0.571487"
				stroke="black"
				strokeWidth="1.14286"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M2.85714 5.29149C2.68274 5.39218 2.53804 5.53717 2.43769 5.71177C2.33734 5.88637 2.28492 6.08439 2.28571 6.28577V10.8572H13.7143V6.28577C13.7151 6.08439 13.6627 5.88637 13.5623 5.71177C13.462 5.53717 13.3173 5.39218 13.1429 5.29149"
				stroke="black"
				strokeWidth="1.14286"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</g>
		<defs>
			<clipPath id="clip0_5340_20288">
				<rect width="16" height="16" fill="white" />
			</clipPath>
		</defs>
	</svg>
));
