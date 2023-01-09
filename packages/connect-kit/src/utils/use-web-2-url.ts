import React from "react";

type IpfsUrl = `ipfs://${string}`;

export type GetWeb2Url = (ipfs: IpfsUrl) => string;

export const UseWeb2UrlContext = React.createContext<GetWeb2Url | null>(null);

const defaultFn: GetWeb2Url = (ipfs) => {
	return ipfs.replace(/^ipfs:\/\//, "https://ipfs.4everland.xyz/ipfs/");
};

export const useWeb2Url: GetWeb2Url = (ipfs) => {
	return (React.useContext(UseWeb2UrlContext) ?? defaultFn)(ipfs);
};
