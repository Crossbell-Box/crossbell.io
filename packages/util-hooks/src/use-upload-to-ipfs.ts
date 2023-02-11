import { useMutation } from "@tanstack/react-query";
import { Ipfs } from "crossbell.js";

export function useUploadToIpfs() {
	return useMutation(
		(...params: Parameters<typeof Ipfs.uploadFile>): Promise<string> =>
			Ipfs.uploadFile(...params).then((res) => res.url)
	);
}
