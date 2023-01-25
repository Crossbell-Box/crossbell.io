import { useMutation } from "@tanstack/react-query";

import { uploadToIpfs } from "~/shared/ipfs";

export function useUploadToIpfs() {
	return useMutation(
		(...params: Parameters<typeof uploadToIpfs>): Promise<string> =>
			uploadToIpfs(...params)
	);
}
