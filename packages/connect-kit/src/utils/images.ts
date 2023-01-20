import { usePreloadImgs } from "@crossbell/util-hooks";
import { useWeb2Urls } from "@crossbell/ui";

export const IMAGES = {
	upgradeToWalletIllustration:
		"ipfs://bafkreieoo25l4ls4hcrdmzogc6muntbxc4mikzm66vzawk5rdfpaz3xw4a",
	claimCSBImg:
		"ipfs://bafkreihjx5itbdah5rlo5qs3afwnmangtwnwsz3fnnfpgxyyskskoo6ote",
	addBtnImg:
		"ipfs://bafkreias276ycc75tns2fgzeewc2moqza3yycatr5dwf7suonocuxxgqdy",
	congratsBg:
		"ipfs://bafkreieaqqcfyung4wz7njitlqtucdbh7rcgpctltapxts3n6dpcmsehoa",
	rainbowIcon:
		"ipfs://bafkreih3hn6aelxug72owjb6wtknikcmadjk7yslwizrdjct4fdpghtyn4",
	whatIsCharacterImg:
		"ipfs://bafkreihz5hygddvnohnui3nxtsr3a4u7pjbs5paqnheazkdfekhksqwym4",
} as const;

const imgs = Object.values(IMAGES);

export function usePreloadAllImgs() {
	const imgUrls = useWeb2Urls(imgs);

	usePreloadImgs(imgUrls);
}
