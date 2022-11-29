import React from "react";
import { RequireAtLeastOne } from "type-fest";
import { Loader } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useConnect } from "wagmi";

import { Wallet, WalletConnector } from "@/components/connectkit/wallets";
import { QRCode } from "@/components/common/QRCode";

import { Header } from "../../components/header";

import { useInitiateConnect } from "./use-initiate-connect";
import { isMobile } from "@/components/connectkit/utils";

type QRCodeWalletConnector = RequireAtLeastOne<WalletConnector, "qrCode">;

export type ConnectWithQRCodeProps = {
	wallet: Wallet;
	connector: QRCodeWalletConnector;
};

export function ConnectWithQRCode({
	wallet,
	connector,
}: ConnectWithQRCodeProps) {
	const [connectorUri, setConnectorUri] = React.useState<string | null>(null);
	const { connectAsync } = useConnect();

	useInitiateConnect(() => {
		connector.connector.on("message", async ({ type }) => {
			if (type === "connecting") {
				const qrCode = await connector.qrCode();

				setConnectorUri(qrCode);

				if (qrCode && isMobile()) {
					window.location.href = qrCode;
				}
			}
		});

		connectAsync(connector).catch((err) =>
			showNotification({
				title: `Error while connect to ${wallet.name}`,
				message: err instanceof Error ? err.message : `${err}`,
				color: "red",
			})
		);
	});

	return (
		<>
			<Header title={`Scan with ${wallet.name}`} />

			<div data-animation="scale-fade-in" className="px-24px pb-24px">
				<div className="w-295px h-295px mx-auto relative flex items-center justify-center border rounded-24px border-[#f7f6f8] p-14px">
					{connectorUri ? (
						<>
							<QRCode
								uri={connectorUri}
								className="w-full h-full"
								size={288}
								ecl="M"
								dotColor="#000"
								backgroundColor="#fff"
								clearArea={true}
							/>

							<div className="absolute left-1/2 top-1/2 w-28% h-28% transform -translate-x-1/2 -translate-y-1/2">
								{wallet.icon}
							</div>
						</>
					) : (
						<Loader size="md" />
					)}
				</div>
			</div>
		</>
	);
}

export function isQRCodeWalletConnector(
	connector: WalletConnector
): connector is QRCodeWalletConnector {
	return !!connector.qrCode;
}
