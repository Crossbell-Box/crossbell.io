import { useMutation } from "@tanstack/react-query";
import { ipfsUploadFile } from "crossbell/ipfs";

export function useUploadToIpfs() {
	return useMutation(
		(...params: Parameters<typeof ipfsUploadFile>): Promise<string> =>
			ipfsUploadFile(...params).then((res) => res.url)
	);
}
