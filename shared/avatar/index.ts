import { ipfsLinkToHttpLink } from "@crossbell/util-ipfs";

import { stringToInteger } from "~/shared/helpers";

const defaultAvatars = [
	"ipfs://bafkreia6kekd3r7zz7vtc5np4kiglar2z2ua5ocnhzf4ulmfub5ailyffi", // black
	"ipfs://bafkreib2ksllnbfpostuoo6xme6c3zs4ddnisevhrdovpz2nvdaki3szxu", // blue
	"ipfs://bafkreiaybovbtmns77vevfc7dawxtth6zqfpnzo26b54u5vdyl6kh43ktm", // green
	"ipfs://bafkreidjccpi6maxzsjy55mu6cyfzpcsojj53x4csb6lndvwvqbcxikq6u", // purple
	"ipfs://bafkreifjteq7ds5vxop7glrwl4cdjzsvjlos3icnjtjuyhdmrzpafuqnee", // red
	"ipfs://bafkreiaoerkx6ir3m57kgq3eivm5j7iuybviry3wgjxncurm6enqwplpre", // white
	"ipfs://bafkreiab4v45chjq4bx4jq5lafc5pa5oxxbs3udmvujeoirui3yj5ktd6q", // yellow
];

export function getDefaultAvatar(handle?: string) {
	const avatarIpfs = (() => {
		if (!handle || (handle.startsWith("0x") && handle.length === 42)) {
			return "ipfs://bafkreie4xfsyflffgdbmscmkb3avuhmwad5dfecbwpbzbelti6n3qmrcqi"; // default
		}

		const seededRandomIndex = stringToInteger(handle, {
			min: 0,
			max: defaultAvatars.length - 1,
		});
		return defaultAvatars[seededRandomIndex];
	})();

	return ipfsLinkToHttpLink(avatarIpfs);
}
