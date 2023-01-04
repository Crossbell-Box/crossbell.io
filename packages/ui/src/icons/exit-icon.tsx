import React from "react";

export const ExitIcon = React.forwardRef<
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
		<g clipPath="url(#clip0_5340_20296)">
			<path
				d="M10.8571 12.0001V14.2858C10.8571 14.5889 10.7367 14.8796 10.5224 15.0939C10.3081 15.3082 10.0174 15.4286 9.71427 15.4286H1.71427C1.41116 15.4286 1.12047 15.3082 0.906146 15.0939C0.691819 14.8796 0.571411 14.5889 0.571411 14.2858V1.71434C0.571411 1.41124 0.691819 1.12055 0.906146 0.906223C1.12047 0.691895 1.41116 0.571487 1.71427 0.571487H9.71427C10.0174 0.571487 10.3081 0.691895 10.5224 0.906223C10.7367 1.12055 10.8571 1.41124 10.8571 1.71434V4.00006"
				stroke="black"
				strokeWidth="1.14286"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M7.42853 8.00006H15.4285"
				stroke="black"
				strokeWidth="1.14286"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M13.1428 5.71434L15.4285 8.00005L13.1428 10.2858"
				stroke="black"
				strokeWidth="1.14286"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</g>
		<defs>
			<clipPath id="clip0_5340_20296">
				<rect width="16" height="16" fill="white" />
			</clipPath>
		</defs>
	</svg>
));
