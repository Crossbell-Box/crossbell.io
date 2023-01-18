import { ComponentProps } from "react";
import dynamic from "next/dynamic";
import { ipfsLinkToHttpLink } from "~/shared/ipfs";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export default function VideoPlayer({
	url,
	...props
}: ComponentProps<typeof ReactPlayer>) {
	if (typeof url === "string") {
		url = ipfsLinkToHttpLink(url);
	} else if (Array.isArray(url)) {
		url = url.map((u) =>
			typeof u === "string"
				? { src: ipfsLinkToHttpLink(u) }
				: { ...u, src: ipfsLinkToHttpLink(u.src) }
		);
	}

	return <ReactPlayer controls url={url} {...props} />;
}
