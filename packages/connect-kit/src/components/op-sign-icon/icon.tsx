import React from "react";

export type IconProps = React.SVGAttributes<SVGSVGElement> & {
	isActive: boolean;
};

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
	({ isActive, ...props }, ref) => (
		<svg
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
			ref={ref}
		>
			<g clipPath="url(#clip0_5707_19977)">
				<path
					d="M16 13C13 13 10 15 10 17V19H22V17C22 15 19 13 16 13ZM19 8C19 6.343 17.656 5 16 5C14.344 5 13 6.343 13 8C13 9.657 14.344 11 16 11C17.656 11 19 9.657 19 8Z"
					fill={
						isActive
							? "rgb(var(--color-38_198_218))"
							: "rgb(var(--color-189_189_189))"
					}
				/>
				<path
					d="M8 13C5 13 2 15 2 17V19H14V17C14 15 11 13 8 13ZM11 8C11 6.343 9.657 5 8 5C6.343 5 5 6.343 5 8C5 9.657 6.343 11 8 11C9.657 11 11 9.657 11 8Z"
					fill={
						isActive
							? "rgb(var(--color-91_137_247))"
							: "rgb(var(--color-153_153_153))"
					}
				/>
			</g>
			<defs>
				<clipPath id="clip0_5707_19977">
					<rect width="24" height="24" fill="white" />
				</clipPath>
			</defs>
		</svg>
	)
);
