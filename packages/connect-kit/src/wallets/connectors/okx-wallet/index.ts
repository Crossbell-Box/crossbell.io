import type { WindowProvider } from "wagmi/window";
import { InjectedConnector } from "wagmi/connectors/injected";
import { Chain } from "wagmi/chains";

const delay = (timeout: number) =>
	new Promise((resolve) => setTimeout(resolve, timeout));

declare global {
	interface Window {
		okxwallet?: WindowProvider;
	}
}

type ConnectorOptions = Exclude<
	Exclude<
		ConstructorParameters<typeof InjectedConnector>[0],
		undefined
	>["options"],
	undefined
>;

export class OKXConnector extends InjectedConnector {
	readonly id = "okx";

	constructor(params?: { chains?: Chain[]; options?: ConnectorOptions }) {
		super({
			chains: params?.chains,
			options: {
				name: "OKX",
				getProvider: () =>
					typeof window === "object" ? window.okxwallet : undefined,
				...params?.options,
			},
		});
	}

	async switchChain(chainId: number) {
		// During the first connection, the network switch popup in OKX Wallet might close unexpectedly and go unnoticed.
		// To fix this, we should introduce a 3-second delay.
		// This way, we can be certain that the previous popup has completely closed before WAGMI initiates a switchNetwork event.
		await delay(3000);

		return super.switchChain(chainId);
	}
}
