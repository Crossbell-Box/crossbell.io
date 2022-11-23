import React from "react";
import classNames from "classnames";
import { Button, Modal, Text } from "@mantine/core";

import { ModalHeader } from "../../components";
import { useDisconnectAccount } from "../../hooks";

import { useModalStore } from "./stores";

export { useModalStore };

const buttonCls = classNames(
	"h-64px w-full border-none rounded-12px text-16px font-500 font-roboto ux-overlay"
);

export function DisconnectModal() {
	const { isActive, hide } = useModalStore();
	const disconnectAccount = useDisconnectAccount(hide);

	return (
		<Modal
			size="auto"
			radius={28}
			withCloseButton={false}
			opened={isActive}
			onClose={hide}
			centered={true}
			padding={0}
		>
			<div className="w-360px">
				<ModalHeader
					title="Disconnect Wallet"
					rightNode={
						<Button
							className="h-auto p-5px text-22px"
							variant="subtle"
							color="gray"
							compact
							onClick={hide}
						>
							<Text className="i-csb:close" />
						</Button>
					}
				/>

				<div className="px-24px flex flex-col gap-12px">
					<button
						className={classNames(buttonCls, "bg-red-primary text-white")}
						onClick={disconnectAccount}
					>
						Disconnect
					</button>

					<button className={buttonCls} onClick={hide}>
						Cancel
					</button>

					<p className="flex items-center justify-center text-[#999] mb-27px">
						<Text className="i-csb:light-bulb text-24px mr-4px" />
						<span className="text-14px font-400">
							you can always log back in at any time.
						</span>
					</p>
				</div>
			</div>
		</Modal>
	);
}
