import { StaticImageData } from "next/image";

import { SupportedPlatform } from "@crossbell/connect-kit";

import mediumBio from "@/public/images/sync/platforms/medium-bio.png";
import mediumName from "@/public/images/sync/platforms/medium-name.png";
import tiktokBio from "@/public/images/sync/platforms/tiktok-bio.png";
import tiktokName from "@/public/images/sync/platforms/tiktok-name.png";
import twitterBio from "@/public/images/sync/platforms/twitter-bio.png";
import twitterName from "@/public/images/sync/platforms/twitter-name.png";
import telegramBio from "@/public/images/sync/platforms/telegram-bio.png";
import telegramName from "@/public/images/sync/platforms/telegram-name.png";
import pinterestBio from "@/public/images/sync/platforms/pinterest-bio.png";
import pinterestName from "@/public/images/sync/platforms/pinterest-name.png";
import substackBio from "@/public/images/sync/platforms/substack-bio.png";
import substackName from "@/public/images/sync/platforms/substack-name.png";
import pixivBio from "@/public/images/sync/platforms/pixiv-bio.png";
import pixivName from "@/public/images/sync/platforms/pixiv-name.png";
import jikeBio from "@/public/images/sync/platforms/jike-bio.png";
import jikeName from "@/public/images/sync/platforms/jike-name.png";

export const NAME_IMAGE_MAP: Record<SupportedPlatform, StaticImageData> = {
	tiktok: tiktokName,
	medium: mediumName,
	pinterest: pinterestName,
	twitter: twitterName,
	tg_channel: telegramName,
	substack: substackName,
	pixiv: pixivName,
	jike: jikeName,
};

export const BIO_IMAGE_MAP: Record<SupportedPlatform, StaticImageData> = {
	tiktok: tiktokBio,
	medium: mediumBio,
	pinterest: pinterestBio,
	twitter: twitterBio,
	tg_channel: telegramBio,
	substack: substackBio,
	pixiv: pixivBio,
	jike: jikeBio,
};
