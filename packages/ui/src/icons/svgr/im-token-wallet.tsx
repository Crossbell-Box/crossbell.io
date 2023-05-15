import * as React from "react";
import type { SVGProps } from "react";
import { Ref, forwardRef } from "react";
const SvgImTokenWallet = (
	props: SVGProps<SVGSVGElement>,
	ref: Ref<SVGSVGElement>
) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		aria-hidden="true"
		viewBox="0 0 32 32"
		ref={ref}
		{...props}
	>
		<path fill="url(#im-token-wallet_svg__a)" d="M0 0h32v32H0z" />
		<path
			fill="#fff"
			d="M26.854 9.965c.696 9.42-5.36 13.873-10.788 14.348-5.048.442-9.798-2.66-10.215-7.424-.344-3.937 2.089-5.613 4-5.78 1.967-.172 3.619 1.184 3.762 2.825.138 1.579-.847 2.297-1.531 2.357-.542.047-1.224-.282-1.285-.988-.053-.607.177-.69.121-1.334-.1-1.147-1.1-1.28-1.648-1.233-.663.058-1.866.832-1.697 2.759.17 1.944 2.033 3.48 4.477 3.266 2.637-.23 4.473-2.283 4.61-5.163 0-.152.032-.303.095-.442v-.004c.03-.06.062-.118.1-.173a2.33 2.33 0 0 1 .222-.28c0-.002 0-.002.002-.002.068-.076.15-.16.242-.248 1.152-1.087 5.3-3.65 9.224-2.838a.393.393 0 0 1 .31.354"
		/>
		<defs>
			<linearGradient
				id="im-token-wallet_svg__a"
				gradientTransform="rotate(90)"
			>
				<stop offset="0%" stopColor="#11C4D1" />
				<stop offset="100%" stopColor="#0062AD" />
			</linearGradient>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgImTokenWallet);
export default ForwardRef;
