import React from "react";

import { Header } from "../components/header";

export function UpgradeToWallet() {
	return (
		<>
			<Header title="Upgrade to Wallet" />

			<div
				data-animation="scale-fade-in"
				className="sm:w-360px px-24px pb-60px pt-10px flex flex-col items-center gap-15px"
			>
				<img
					className="w-145px h-104px"
					src="/images/connect-kit/upgrade-to-wallet/illustration.png"
					alt="Illustration"
				/>

				<p className="m-0 text-14px font-400 text-[#49454F] text-center">
					The upgrade process will be released
					<br />
					in next two weeks
				</p>
			</div>
		</>
	);
}
