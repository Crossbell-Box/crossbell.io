import React from "react";
import { Avatar } from "@mantine/core";
import classNames from "classnames";

import { useAccountState, useConnectModal } from "@crossbell/connect-kit";
import { truncateAddress } from "@crossbell/util-ethers";
import { extractCharacterAvatar } from "@crossbell/util-metadata";
import { ipfsLinkToHttpLink } from "@crossbell/util-ipfs";
import { getDefaultAvatarIpfsUrl } from "@crossbell/ui";

import { AccountMenu } from "../account-menu";

export function ConnectBtn() {
	const [account, ssrReady] = useAccountState((s) => [
		s.computed.account,
		s.ssrReady,
	]);
	const connectModal = useConnectModal();

	if (account) {
		const avatar = ipfsLinkToHttpLink(
			extractCharacterAvatar(account.character) ??
				getDefaultAvatarIpfsUrl(account.character?.handle)
		);

		const address =
			account.type === "email"
				? account.email
				: truncateAddress(account.address);

		return (
			<AccountMenu>
				<button className="flex-shrink-1 overflow-hidden outline-none border-1 border-[#D1D9F0] text-[#082135] text-18px font-600 bg-[#FFF] rounded-12px py-8px px-16px flex items-center gap-[8px] cursor-pointer transform active:translate-y-1px">
					<span className="truncate flex-shrink-1">{address}</span>
					<Avatar
						src={avatar}
						alt="Avatar"
						className="rounded-full"
						size={34}
					/>
				</button>
			</AccountMenu>
		);
	} else {
		return (
			<button
				className={classNames(
					"outline-none bg-[#000] text-[#FFF] font-400 text-18px px-24px py-12px rounded-12px border-none cursor-pointer transform active:translate-y-1px",
					ssrReady ? "opacity-100" : "opacity-0"
				)}
				onClick={connectModal.show}
			>
				Connect
			</button>
		);
	}
}
