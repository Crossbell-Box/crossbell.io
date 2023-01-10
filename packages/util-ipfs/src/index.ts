export const ipfsLinkToHttpLink = (
	rawLink: string,
	config?: { origin?: string | null }
): string => {
	if (!rawLink) {
		return "";
	}

	const origin = config?.origin ?? null;
	const link = rawLink.replace(/^ipfs:\/\//, "/ipfs/");

	if (origin === null) {
		return link;
	} else {
		if (link.startsWith("/")) {
			return origin + link;
		} else {
			return link;
		}
	}
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
