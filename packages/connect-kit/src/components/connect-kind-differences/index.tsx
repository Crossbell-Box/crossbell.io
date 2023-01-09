import React from "react";

import styles from "./index.module.css";

import { EmailSvg, EmailBg, WalletSvg, WalletBg } from "./svgs";

export function ConnectKindDifferences() {
	return (
		<>
			<div data-animation="scale-fade-in" className={styles.container}>
				<div className={styles.section1}>
					<WalletBg className={styles.walletBg} />

					<WalletSvg className={styles.walletSvg} />

					<div className={styles.section1Layout}>
						<h4 className={styles.listTitle}>Wallet</h4>
						<ul className={styles.list}>
							<li>xSync</li>
							<li>xFeed</li>
							<li>xShop(Mint)</li>
							<li>xCharacter</li>
						</ul>
					</div>
				</div>

				<div className={styles.section2}>
					<EmailBg className={styles.emailBg} />

					<EmailSvg className={styles.emailSvg} />

					<div className={styles.section2Layout}>
						<h4 className={styles.listTitle}>Email</h4>
						<ul className={styles.list}>
							<li>xSync</li>
							<li>xFeed</li>
							<li>xCharacter</li>
						</ul>
					</div>
				</div>
			</div>

			<a
				href="https://crossbell-blog.xlog.app/newbie-villa"
				target="_blank"
				rel="noreferrer"
				className={styles.learnMoreLink}
			>
				<button className={styles.learnMoreBtn}>Learn More</button>
			</a>
		</>
	);
}
