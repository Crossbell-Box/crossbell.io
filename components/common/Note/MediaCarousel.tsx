import { ipfsLinkToHttpLink } from "@/utils/ipfs";
import { NoteMetadata } from "crossbell.js";
import Slider from "react-slick";
import Image from "../Image";
import { useEffect, useRef, useState } from "react";
import { useWindowEvent } from "@mantine/hooks";
import { Space } from "@mantine/core";

export type MediaType = "image" | "video" | "audio" | "model" | "pdf" | "html";

export function mimeTypeToMediaType(mimeType: string): MediaType | null {
	if (mimeType.startsWith("image")) {
		return "image";
	}

	if (mimeType.startsWith("video")) {
		return "video";
	}

	if (mimeType.startsWith("audio") || mimeType.endsWith("ogg")) {
		return "audio";
	}

	if (mimeType.startsWith("model")) {
		return "model";
	}

	if (mimeType.startsWith("application/pdf")) {
		return "pdf";
	}

	if (mimeType.startsWith("text/html")) {
		return "html";
	}

	return null;
}

export default function MediaCarousel({
	attachments,
}: {
	attachments: NoteMetadata["attachments"];
}) {
	const nodeRef = useRef<HTMLDivElement>(null);

	const [width, setWidth] = useState<number>(0);

	useEffect(() => {
		if (nodeRef.current) {
			const { width: w } = nodeRef.current.getBoundingClientRect();
			setWidth(w);
		}
	}, []);

	useWindowEvent("resize", () => {
		if (nodeRef.current) {
			const { width: w } = nodeRef.current.getBoundingClientRect();
			setWidth(w);
		}
	});

	const [mainSlider, setMainSlider] = useState<Slider | null>(null);
	const [thumbSlider, setThumbSlider] = useState<Slider | null>(null);

	if (!attachments || attachments?.length === 0) {
		return <></>;
	}

	const renderAttachments = ({
		isThumbnail = false,
	}: {
		isThumbnail?: boolean;
	} = {}) => {
		return attachments
			.filter((a) => a.mime_type && a.address)
			.map((a, index) => {
				const mediaType = mimeTypeToMediaType(a.mime_type!);
				if (a.address) {
					const src = ipfsLinkToHttpLink(a.address);
					if (mediaType === "image") {
						return (
							<div key={index}>
								<div
									data-what="123"
									style={{
										width: isThumbnail ? 100 : width,
										height: isThumbnail ? 50 : 300,
										position: "relative",
									}}
								>
									<Image
										alt="image" // TODO: introduce alt in convention
										src={src}
										width={isThumbnail ? 100 : width}
										height={isThumbnail ? 50 : 300}
										onClick={() => {
											if (!isThumbnail) {
												window.open(src);
											}
										}}
									/>
								</div>
							</div>
						);
					}
				}

				return <></>;
			});
	};

	return (
		// https://react-slick.neostack.com/
		// TODO: https://v5.mantine.dev/others/carousel/
		<div
			className="w-full overflow-hidden"
			onClick={(e) => {
				e.stopPropagation();
			}}
		>
			<div className="w-full" ref={nodeRef}></div>

			{/* main */}
			<Slider
				className="h-300px overflow-hidden relative"
				// @ts-ignore
				style={{ width }}
				slidesToShow={1}
				slidesToScroll={1}
				lazyLoad="anticipated"
				ref={(slider) => setMainSlider(slider)}
				asNavFor={thumbSlider!}
			>
				{renderAttachments()}
			</Slider>

			<Space h={10} />

			{/* thumbnails */}
			{attachments.length >= 2 && (
				<Slider
					className="h-50px overflow-hidden slick-thumb"
					// @ts-ignore
					style={{ width }}
					slidesToShow={5}
					slidesToScroll={1}
					ref={(slider) => setThumbSlider(slider)}
					asNavFor={mainSlider!}
					focusOnSelect
					centerMode
					centerPadding="60px"
				>
					{renderAttachments({ isThumbnail: true })}
				</Slider>
			)}
		</div>
	);
}
