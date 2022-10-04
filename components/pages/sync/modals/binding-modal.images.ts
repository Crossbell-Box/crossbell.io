import { StaticImageData } from "next/image";

import { SupportedPlatform } from "@/utils/apis/operator-sync";

import mediumBio from "@/public/images/sync/platforms/medium-bio.png";
import mediumName from "@/public/images/sync/platforms/medium-name.png";
import tiktokBio from "@/public/images/sync/platforms/tiktok-bio.png";
import tiktokName from "@/public/images/sync/platforms/tiktok-name.png";
// import pinterestBio from "@/public/images/sync/platforms/pinterest-bio.png";
// import pinterestName from "@/public/images/sync/platforms/pinterest-name.png";
// import twitterBio from "@/public/images/sync/platforms/twitter-bio.png";
// import twitterName from "@/public/images/sync/platforms/twitter-name.png";

export const NAME_IMAGE_MAP: Record<SupportedPlatform, StaticImageData> = {
	tiktok: tiktokName,
	medium: mediumName,
};

export const BIO_IMAGE_MAP: Record<SupportedPlatform, StaticImageData> = {
	tiktok: tiktokBio,
	medium: mediumBio,
};
