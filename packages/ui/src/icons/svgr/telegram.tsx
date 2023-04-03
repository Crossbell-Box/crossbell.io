import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const SvgTelegram = (
	props: SVGProps<SVGSVGElement>,
	ref: Ref<SVGSVGElement>
) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 25 24"
		ref={ref}
		{...props}
	>
		<g clipPath="url(#telegram_svg__a)">
			<path
				fill="#F2F2F2"
				fillRule="evenodd"
				d="M24.538 12c0 6.627-5.372 12-12 12-6.627 0-12-5.373-12-12s5.373-12 12-12c6.628 0 12 5.373 12 12Zm-11.57-3.141c-1.167.485-3.5 1.49-6.998 3.014-.568.226-.865.447-.892.663-.046.366.411.51 1.034.705.085.027.172.054.262.084.613.199 1.437.432 1.866.441.388.008.822-.152 1.301-.48 3.269-2.207 4.956-3.322 5.062-3.346.075-.017.178-.039.248.024.07.062.063.18.056.212-.045.193-1.84 1.862-2.77 2.726-.289.269-.495.46-.537.504-.093.097-.19.19-.282.279-.569.548-.996.96.024 1.632.49.323.882.59 1.273.856.428.291.854.581 1.405.943.14.092.275.187.405.28.497.355.944.673 1.496.623.32-.03.652-.331.82-1.23.398-2.126 1.18-6.73 1.36-8.628a2.117 2.117 0 0 0-.02-.472.506.506 0 0 0-.171-.325c-.144-.117-.366-.142-.465-.14-.451.008-1.144.249-4.476 1.635Z"
				clipRule="evenodd"
			/>
		</g>
		<defs>
			<clipPath id="telegram_svg__a">
				<path fill="currentColor" d="M.538 0h24v24h-24z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgTelegram);
export default ForwardRef;
