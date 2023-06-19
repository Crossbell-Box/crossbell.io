import { handleActions } from "@crossbell/util-hooks";
import { CoinbaseWalletConnector as BaseConnector } from "wagmi/connectors/coinbaseWallet";
import {
	Chain,
	numberToHex,
	SwitchChainError,
	UserRejectedRequestError,
} from "viem";

import { connectorStore } from "../store";

// When initializing `BaseConnector` with non-whitelisted chains,
// the Coinbase Wallet extension becomes problematic, as it may throw
// an error upon connecting or its transaction page may become completely blank.
//
// The issue is caused by the extension's internal logic that
// ignores the `wallet_addEthereumChain` request when the default
// chain is the same as the one passed during SDK initialization.
//
// To resolve this problem, we need to omit the `chains` option when
// initializing the BaseConnector, and handle the `switchChain` method appropriately.
export class CoinbaseWalletConnector extends BaseConnector {
	private __chains: Chain[];

	constructor({
		chains,
		...options
	}: ConstructorParameters<typeof BaseConnector>[0]) {
		super(options);

		this.__chains = chains ?? [];
	}

	isAuthorized = async (): Promise<boolean> => {
		if (connectorStore.getState().connectedConnectorId !== this.id) {
			return false;
		}

		return super.isAuthorized();
	};

	async getProvider() {
		const provider = await super.getProvider();

		return handleActions(provider, async ({ action, path }) => {
			if (path[0] === "enable") {
				try {
					return await action();
				} catch (e: any) {
					// When connecting to the Coinbase Wallet extension with a non-whitelisted chain,
					// the extension may throw an error but still establish a successful connection.
					if (e?.data?.originalError?.code === 4902) {
						return provider.request({
							method: "eth_accounts",
						});
					}

					throw e instanceof Error ? e : e?.message ?? e;
				}
			} else {
				return action();
			}
		});
	}

	async switchChain(chainId: number) {
		const provider = await this.getProvider();
		const id = numberToHex(chainId);

		try {
			await provider.request({
				method: "wallet_switchEthereumChain",
				params: [{ chainId: id }],
			});

			return (
				this.__chains.find((x) => x.id === chainId) ?? {
					id: chainId,
					name: `Chain ${id}`,
					network: `${id}`,
					nativeCurrency: { name: "Ether", decimals: 18, symbol: "ETH" },
					rpcUrls: { default: { http: [""] }, public: { http: [""] } },
				}
			);
		} catch (error) {
			const chain = this.__chains.find((x) => x.id === chainId);

			if (isChainNotConfiguredError(error) && chain) {
				try {
					await provider.request({
						method: "wallet_addEthereumChain",
						params: [
							{
								chainId: id,
								chainName: chain.name,
								nativeCurrency: chain.nativeCurrency,
								rpcUrls: [chain.rpcUrls.public?.http[0] ?? ""],
								blockExplorerUrls: this.getBlockExplorerUrls(chain),
							},
						],
					});
					return chain;
				} catch (error) {
					throw new UserRejectedRequestError(error as Error);
				}
			}

			throw new SwitchChainError(error as Error);
		}
	}
}

function isChainNotConfiguredError(error: any): boolean {
	return error?.data?.originalError?.code === 4902 || error?.code === 4902;
}
