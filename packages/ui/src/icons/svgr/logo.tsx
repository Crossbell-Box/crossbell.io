import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const SvgLogo = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 20 20"
		ref={ref}
		{...props}
	>
		<g clipPath="url(#logo_svg__a)" fill="currentColor">
			<path d="M12.844 18.419C12.844 19.292 11.571 20 10 20c-1.57 0-2.845-.708-2.845-1.581h5.69ZM7.743 7.827l-4.622.878C3.121 3.898 5.95 0 9.44 0L9.41 6.322 7.743 7.827ZM9.179 11.025l-.25 2.619-.337 3.559-.085.01c-1.135.118-2.726-.243-4.315-1.062-1.92-.992-3.3-2.376-3.632-3.51a3.13 3.13 0 0 0 1.372-.436c.576-.333 1.002-.784 1.201-1.218a1.41 1.41 0 0 0 .072-.189c.05-.152.065-.315.04-.474l4.493-.741 1.44 1.442ZM12.255 7.827l4.622.878C16.879 3.898 14.05 0 10.56 0l.028 6.322 1.666 1.505ZM10.822 11.025l.248 2.619.338 3.559.085.01c1.135.118 2.726-.243 4.315-1.062 1.922-.992 3.3-2.376 3.632-3.51a3.13 3.13 0 0 1-1.372-.436c-.576-.333-1.002-.784-1.201-1.218a1.414 1.414 0 0 1-.072-.189 1.019 1.019 0 0 1-.04-.474l-4.493-.741-1.44 1.442Z" />
		</g>
		<defs>
			<clipPath id="logo_svg__a">
				<path fill="#fff" transform="translate(.56)" d="M0 0h18.879v20H0z" />
			</clipPath>
		</defs>
	</svg>
);
const ForwardRef = forwardRef(SvgLogo);
export default ForwardRef;
