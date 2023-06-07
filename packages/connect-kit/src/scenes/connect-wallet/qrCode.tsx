import React from "react";
import { RequireAtLeastOne } from "type-fest";
import { Loader } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useConnect } from "wagmi";
import { crossbell } from "wagmi/chains";

import { isMobile } from "../../utils";
import { QRCode, ModalHeaderProps } from "../../components";
import { Wallet, WalletConnector } from "../../wallets";

import { useInitiateConnect } from "./use-initiate-connect";
import styles from "./qrCode.module.css";

type QRCodeWalletConnector = RequireAtLeastOne<WalletConnector, "qrCode">;

export type ConnectWithQRCodeProps = {
	Header: React.ComponentType<ModalHeaderProps>;
	wallet: Wallet;
	connector: QRCodeWalletConnector;
};

export function ConnectWithQRCode({
	Header,
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

		connectAsync({ ...connector, chainId: crossbell.id }).catch((err) => {
			console.error(err);
			showNotification({
				title: `Error while connect to ${wallet.name}`,
				message: err instanceof Error ? err.message : `${err}`,
				color: "red",
			});
		});
	});

	return (
		<>
			<Header title={`Scan with ${wallet.name}`} />

			<div data-animation="scale-fade-in" className={styles.container}>
				<div className={styles.layout}>
					{connectorUri ? (
						<>
							<QRCode
								uri={connectorUri}
								className={styles.qrCode}
								size={288}
								ecl="M"
								dotColor="rgb(var(--color-0_0_0))"
								backgroundColor="rgb(var(--color-255_255_255))"
								clearArea={true}
							/>

							<div className={styles.walletIcon}>{wallet.icon}</div>
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
