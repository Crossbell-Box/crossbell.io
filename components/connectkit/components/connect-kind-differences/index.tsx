import React from "react";
import classNames from "classnames";

import Image from "@/components/common/Image";

import styles from "./index.module.css";

export function ConnectKindDifferences() {
	return (
		<>
			<div data-animation="scale-fade-in" className="sm:w-343px">
				<div className="relative aspect-343/176">
					<Image
						fill
						src="/images/connect-kit/connect-kind-differences/wallet-bg.svg"
						placeholder="empty"
						className="object-cover pointer-events-none"
					/>

					<Image
						src="/images/connect-kit/connect-kind-differences/wallet.svg"
						placeholder="empty"
						width={76}
						height={76}
						className="absolute left-21px top-55px"
					/>

					<div className="absolute right-43px top-20px">
						<h4 className="text-16px font-500 m-0 text-center">Wallet</h4>
						<ul
							className={classNames(
								"text-14px font-400 text-[#999] list-none p-0 mt-8px",
								styles.list
							)}
						>
							<li>xSync</li>
							<li>xFeed</li>
							<li>xShop(Mint)</li>
							<li>xCharacter</li>
						</ul>
					</div>
				</div>

				<div className="relative aspect-340/176">
					<Image
						fill
						src="/images/connect-kit/connect-kind-differences/email-bg.svg"
						placeholder="empty"
						className="object-cover"
					/>

					<Image
						src="/images/connect-kit/connect-kind-differences/email.svg"
						placeholder="empty"
						width={76}
						height={76}
						className="absolute right-61px top-67px"
					/>

					<div className="absolute left-30px top-40px">
						<h4 className="text-16px font-500 m-0 text-center">Email</h4>
						<ul
							className={classNames(
								"text-14px font-400 text-[#999] list-none p-0 mt-8px",
								styles.list
							)}
						>
							<li>xSync</li>
							<li>xFeed</li>
							<li>xCharacter</li>
						</ul>
					</div>
				</div>
			</div>

			{/* TODO: - add link */}
			<a
				href="@/components/connectkit/components/connect-kind-differences/index"
				target="_blank"
				rel="noreferrer"
				className="flex mt-12px mx-24px mb-24px"
			>
				<button className="w-full h-48px bg-[#F6F7F9] text-black text-14px font-500 border-none cursor-pointer rounded-16px font-roboto">
					Learn More
				</button>
			</a>
		</>
	);
}
