import { IpfsGateway, isIpfsUrl } from "@crossbell/ipfs-gateway"

export const ipfsGateway = new IpfsGateway()

export const ipfsLinkToHttpLink = (link: string): string => {
	if (!link) {
		return "";
	}

	if (isIpfsUrl(link)) {
		return ipfsGateway.getSwWeb2Url(link);
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
