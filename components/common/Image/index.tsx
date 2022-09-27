import { ipfsLinkToHttpLink } from "@/utils/ipfs";
import {
	default as NextImage,
	type ImageLoader,
	type ImageProps,
} from "next/future/image";
import { PropsWithChildren, useEffect, useState } from "react";

// Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
const keyStr =
	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

const triplet = (e1: number, e2: number, e3: number) =>
	keyStr.charAt(e1 >> 2) +
	keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
	keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
	keyStr.charAt(e3 & 63);

const rgbDataURL = (r: number, g: number, b: number) =>
	`data:image/gif;base64,R0lGODlhAQABAPAA${
		triplet(0, r, g) + triplet(b, 255, 255)
	}/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

const randomColor = () => {
	const r = Math.floor(Math.random() * 256);
	const g = Math.floor(Math.random() * 256);
	const b = Math.floor(Math.random() * 256);
	return rgbDataURL(r, g, b);
};

const shimmer = (w = "100%", h = "100%") => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
	typeof window === "undefined"
		? Buffer.from(str).toString("base64")
		: window.btoa(str);

const isLocalImage = (s: ImageProps["src"]) =>
	(typeof s === "string" &&
		(s.startsWith("data:image/") ||
			(s.startsWith("/") && !s.startsWith("/ipfs/" /* ipfs sw */)))) ||
	typeof s === "object"; // StaticImport

export default function Image({
	src,
	alt,
	fill,
	...props
}: PropsWithChildren<Omit<ImageProps, "alt">> & {
	alt?: string;
}) {
	const originalSrc = src;
	if (typeof src === "string") {
		src = ipfsLinkToHttpLink(src, { noOrigin: true });
	}

	const thumborLoader: ImageLoader = ({ src, width, quality }) => {
		if (isLocalImage(src)) {
			return src;
		}

		src = ipfsLinkToHttpLink(src, { forceProductionOrigin: true });
		// const w = typeof props.width === "number" ? props.width : width;
		// const h = typeof props.height === "number" ? props.height : 0;
		const w = width;
		const h = 0;
		return `https://thumbor.rss3.dev/unsafe/${w}x${h}/smart/${src}`;
	};

	const [_src, _setSrc] = useState(src);

	useEffect(() => {
		_setSrc(src);
	}, [src]);

	return (
		<NextImage
			src={_src}
			alt={
				alt ?? typeof originalSrc === "string"
					? (originalSrc as string)
					: "image"
			}
			loader={thumborLoader}
			placeholder="blur"
			// blurDataURL={randomColor()}
			blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer())}`}
			onError={() => _setSrc("/images/image-error.png")}
			fill={fill}
			{...(fill
				? { sizes: "(min-width: 75em) 33vw, (min-width: 48em) 50vw, 100vw" }
				: {})}
			{...(isLocalImage(_src) ? { unoptimized: true } : {})}
			{...props}
			data-original-url={
				typeof originalSrc === "string" ? originalSrc : undefined
			}
		/>
	);
}
