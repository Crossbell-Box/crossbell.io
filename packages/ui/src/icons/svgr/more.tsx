import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const SvgMore = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="currentColor"
		viewBox="0 0 32 32"
		ref={ref}
		{...props}
	>
		<path
			fill="#000"
			stroke="#000"
			strokeWidth={2}
			d="M7.533 17.2c-.355 0-.65-.117-.883-.35A1.157 1.157 0 0 1 6.3 16c0-.333.122-.617.367-.85.244-.233.533-.35.866-.35.334 0 .623.117.867.35.244.233.367.517.367.85 0 .333-.123.617-.367.85-.244.233-.533.35-.867.35Zm8.467 0c-.333 0-.617-.117-.85-.35a1.157 1.157 0 0 1-.35-.85c0-.333.117-.617.35-.85.233-.233.517-.35.85-.35.333 0 .617.117.85.35.233.233.35.517.35.85 0 .333-.117.617-.35.85-.233.233-.517.35-.85.35Zm8.467 0c-.334 0-.623-.117-.867-.35a1.131 1.131 0 0 1-.367-.85c0-.333.122-.617.367-.85.244-.233.533-.35.867-.35.355 0 .65.117.883.35.233.233.35.517.35.85 0 .333-.122.617-.367.85-.244.233-.533.35-.866.35Z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgMore);
export default ForwardRef;
