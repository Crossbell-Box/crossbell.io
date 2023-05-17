import { CoinbaseWalletConnector as BaseConnector } from "wagmi/connectors/coinbaseWallet";
import { handleActions } from "@crossbell/util-hooks";

export class CoinbaseWalletConnector extends BaseConnector {
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
}
