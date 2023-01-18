import React from "react";

export type GetWeb2Url = (ipfs: string) => string;

export const UseWeb2UrlContext = React.createContext<GetWeb2Url | null>(null);

const defaultFn: GetWeb2Url = (ipfs) => {
	return ipfs.replace(/^ipfs:\/\//, "https://ipfs.4everland.xyz/ipfs/");
};

export function useGetWeb2Url() {
	return React.useContext(UseWeb2UrlContext) ?? defaultFn;
}

export const useWeb2Url = (ipfs: string) => {
	const getWeb2Url = useGetWeb2Url();
	return React.useMemo(() => getWeb2Url(ipfs), [getWeb2Url, ipfs]);
};

export function useWeb2Urls(ipfsList: string[]): string[] {
	const getWeb2Url = useGetWeb2Url();

	return React.useMemo(
		() => ipfsList.map((url) => getWeb2Url(url)),
		[getWeb2Url, ...ipfsList]
	);
}
