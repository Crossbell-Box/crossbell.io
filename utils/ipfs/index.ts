export const DEFAULT_GATEWAY = "https://ipfs.infura.io/ipfs/";

export const ipfsLinkToHttpLink = (link: string) => {
	if (link.startsWith("ipfs://")) {
		const ipfsHash = link.substring("ipfs://".length);
		return `${DEFAULT_GATEWAY}${ipfsHash}`;
	}

	return link;
};

export const uploadToIpfs = async (file: File | Blob) => {
	const formData = new FormData();
	formData.append("file", file);

	const result = await fetch("https://ipfs-relay.crossbell.io/upload", {
		method: "PUT",
		body: formData,
	});

	if (result.ok) {
		const res = await result.json();
		return res.url;
	}
};
