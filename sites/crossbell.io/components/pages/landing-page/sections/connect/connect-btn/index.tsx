import React from "react";
import { useConnectModal, useAccountState } from "@crossbell/connect-kit";
import classNames from "classnames";

import { CirclesBg } from "./circles-bg";

const btnClass =
	"ux-overlay border-none w-full max-w-[342px] h-[60px] md:h-[110px] rounded-[12px] md:rounded-[20px] text-[18px] md:text-[44px] font-bold";

export type ConnectBtnProps = {
	onClickScrollDown: () => void;
};

export function ConnectBtn({ onClickScrollDown }: ConnectBtnProps) {
	const connectModal = useConnectModal();
	const account = useAccountState((s) => s.computed.account);

	return (
		<div className="flex items-center justify-center relative mx-[24px] w-full md:w-[300px]">
			<div className="w-[1024px] h-[1024px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-20 pointer-events-none">
				<CirclesBg className="absolute left-0 top-0 w-full h-full" />
			</div>

			{account ? (
				<button
					className={classNames(btnClass, "bg-[#6AD991] text-[#000]")}
					onClick={onClickScrollDown}
				>
					Scroll Down
				</button>
			) : (
				<button
					className={classNames(btnClass, "bg-[#6AD991] text-[#000]")}
					onClick={connectModal.show}
				>
					Connect
				</button>
			)}
		</div>
	);
}
