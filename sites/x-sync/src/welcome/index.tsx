import React from "react";
import Link from "next/link";

import { Scenes, ConnectBtn, Logo } from "../components";

export type OperatorSyncWelcomeProps = {
	onStart: () => void;
};

export function OperatorSyncWelcome({ onStart }: OperatorSyncWelcomeProps) {
	return (
		<div className="relative z-0 min-h-100vh flex items-center justify-center overflow-hidden">
			<Scenes onStart={onStart} />
			<div
				className="absolute left-1/2 top-0 transform -translate-x-1/2 py-16px sm:pt-30px sm:pb-15px px-3vw w-full"
				style={{
					background:
						"linear-gradient(transparent, transparent 50%, #FFF), url('/images/header-texture.svg')",
				}}
			>
				<div className="w-full max-w-900px flex items-center justify-between mx-auto min-h-52px gap-[16px]">
					<Link href="/">
						<Logo />
					</Link>
					<ConnectBtn />
				</div>
			</div>
		</div>
	);
}
