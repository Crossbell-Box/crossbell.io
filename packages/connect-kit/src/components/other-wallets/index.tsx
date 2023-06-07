import React from "react";
import classNames from "classnames";
import { useWeb2Url } from "@crossbell/ui";

import { IMAGES } from "../../utils";

import styles from "./index.module.css";

const WalletConnect = (props: React.SVGAttributes<SVGSVGElement>) => (
	<svg
		{...props}
		width="32"
		height="32"
		viewBox="0 0 32 32"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M9.58818 11.8556C13.1293 8.31442 18.8706 8.31442 22.4117 11.8556L22.8379 12.2818C23.015 12.4588 23.015 12.7459 22.8379 12.9229L21.3801 14.3808C21.2915 14.4693 21.148 14.4693 21.0595 14.3808L20.473 13.7943C18.0026 11.3239 13.9973 11.3239 11.5269 13.7943L10.8989 14.4223C10.8104 14.5109 10.6668 14.5109 10.5783 14.4223L9.12041 12.9645C8.94336 12.7875 8.94336 12.5004 9.12041 12.3234L9.58818 11.8556ZM25.4268 14.8706L26.7243 16.1682C26.9013 16.3452 26.9013 16.6323 26.7243 16.8093L20.8737 22.6599C20.6966 22.8371 20.4096 22.8371 20.2325 22.6599L16.0802 18.5076C16.0359 18.4634 15.9641 18.4634 15.9199 18.5076L11.7675 22.6599C11.5905 22.8371 11.3034 22.8371 11.1264 22.66C11.1264 22.66 11.1264 22.6599 11.1264 22.6599L5.27561 16.8092C5.09856 16.6322 5.09856 16.3451 5.27561 16.168L6.57313 14.8706C6.75019 14.6934 7.03726 14.6934 7.21431 14.8706L11.3668 19.023C11.411 19.0672 11.4828 19.0672 11.5271 19.023L15.6793 14.8706C15.8563 14.6934 16.1434 14.6934 16.3205 14.8706L20.473 19.023C20.5172 19.0672 20.589 19.0672 20.6332 19.023L24.7856 14.8706C24.9627 14.6935 25.2498 14.6935 25.4268 14.8706Z"
			fill="currentColor"
		/>
	</svg>
);

const ImToken = (props: React.SVGAttributes<SVGSVGElement>) => (
	<svg
		{...props}
		aria-hidden="true"
		width="32"
		height="32"
		viewBox="0 0 32 32"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		style={{
			background: `linear-gradient(180deg, rgb(var(--color-17_196_209)) 0%, rgb(var(--color-0_98_173)) 100%)`,
		}}
	>
		<path
			d="M26.8543 9.96509C27.5498 19.3857 21.4942 23.8384 16.0655 24.3132C11.0184 24.7546 6.26765 21.6534 5.85087 16.8885C5.50707 12.952 7.94004 11.2761 9.8516 11.109C11.8177 10.9367 13.4698 12.2925 13.6132 13.9342C13.7512 15.5125 12.7664 16.2308 12.0815 16.2906C11.5398 16.3381 10.8584 16.0093 10.7968 15.3032C10.7441 14.6965 10.9744 14.6138 10.9182 13.9693C10.8179 12.8219 9.81731 12.6882 9.26951 12.7357C8.60654 12.7937 7.40368 13.5675 7.5725 15.4949C7.7422 17.439 9.60628 18.9751 12.0498 18.7614C14.6868 18.531 16.5227 16.4779 16.6608 13.5983C16.6595 13.4458 16.6916 13.2948 16.7548 13.156L16.7557 13.1525C16.7841 13.0922 16.8174 13.0342 16.8551 12.9793C16.9113 12.8949 16.9835 12.8016 17.0767 12.6997C17.0775 12.697 17.0775 12.697 17.0793 12.697C17.147 12.6205 17.2288 12.5379 17.3211 12.4491C18.473 11.3623 22.6214 8.79916 26.5448 9.61074C26.6277 9.62851 26.7026 9.67262 26.7584 9.73649C26.8142 9.80035 26.8478 9.88054 26.8543 9.96509"
			fill="white"
		/>
	</svg>
);

const Rainbow = (props: React.SVGAttributes<SVGSVGElement>) => {
	const img = useWeb2Url(IMAGES.rainbowIcon);

	return (
		<svg
			{...props}
			aria-hidden="true"
			width="120"
			height="120"
			viewBox="0 0 120 120"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style={{
				backgroundSize: "100% 100%",
				backgroundImage: `url("${img}")`,
			}}
		/>
	);
};

const Zerion = (props: React.SVGAttributes<SVGSVGElement>) => (
	<svg
		{...props}
		aria-hidden="true"
		width="88"
		height="88"
		viewBox="0 0 88 88"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		style={{
			background:
				"linear-gradient(120.22deg, rgb(var(--color-41_98_239)) 0%, rgb(var(--color-37_92_229)) 100%)",
		}}
	>
		<path
			d="M19.0864 22C17.5783 22 16.9973 23.8648 18.2628 24.6438L49.9199 43.732C50.709 44.2178 51.7614 44.0258 52.3048 43.2969L66.2236 25.024C67.17 23.7545 66.2138 22 64.5757 22H19.0864Z"
			fill="white"
		/>
		<path
			d="M68.8425 66C70.3503 66 70.9466 64.1252 69.6814 63.3464L38.015 44.2605C37.2259 43.7748 36.1989 43.991 35.6558 44.7198L21.7099 62.9891C20.7639 64.2582 21.7499 66 23.3877 66H68.8425Z"
			fill="white"
		/>
	</svg>
);

export const OtherWallets = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div {...props} className={className}>
			<div className={styles.row}>
				<div className={styles.cell}>
					<WalletConnect
						className={classNames(styles.icon, styles.walletConnect)}
					/>
				</div>
				<div className={styles.cell}>
					<Zerion className={styles.icon} />
				</div>
			</div>
			<div className={styles.row}>
				<div className={styles.cell}>
					<Rainbow className={styles.icon} />
				</div>
				<div className={styles.cell}>
					<ImToken className={styles.icon} />
				</div>
			</div>
		</div>
	);
};
