import {
	default as NextImage,
	type ImageLoader,
	type ImageProps,
} from "next/image";
import { PropsWithChildren } from "react";

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

export default function Image({
	src,
	...props
}: PropsWithChildren<ImageProps>) {
	const thumborLoader: ImageLoader = ({ src, width, quality }) => {
		const w = props.width ?? width;
		const h = props.height ?? "0";
		return `https://thumbor.rss3.dev/unsafe/${w}x${h}/smart/${src}`;
	};

	return (
		<NextImage
			src={src}
			loader={thumborLoader}
			layout="responsive"
			objectFit="cover"
			placeholder="blur"
			// blurDataURL={randomColor()}
			blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer())}`}
			{...props}
		/>
	);
}
