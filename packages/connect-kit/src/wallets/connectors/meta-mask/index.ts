import { MetaMaskConnector as Connector } from "wagmi/connectors/metaMask";

const delay = (timeout: number) =>
	new Promise((resolve) => setTimeout(resolve, timeout));

export class MetaMaskConnector extends Connector {
	async switchChain(chainId: number) {
		if (typeof window == "object" && "okxwallet" in window) {
			// During the first connection, the network switch popup in OKX Wallet might close unexpectedly and go unnoticed.
			// To fix this, we should introduce a 3-second delay.
			// This way, we can be certain that the previous popup has completely closed before WAGMI initiates a switchNetwork event.
			await delay(3000);
		}
		return super.switchChain(chainId);
	}
}
