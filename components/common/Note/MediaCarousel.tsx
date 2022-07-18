import { ipfsLinkToHttpLink } from "@/utils/ipfs";
import { NoteMetadata } from "crossbell.js";
import { Carousel, Embla } from "@mantine/carousel";
import Image from "../Image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useWindowEvent } from "@mantine/hooks";
import { Space } from "@mantine/core";
import classNames from "classnames";

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

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
	return value !== null && value !== undefined;
}

export default function MediaCarousel({
	attachments,
}: {
	attachments: NoteMetadata["attachments"];
}) {
	if (!attachments || attachments?.length === 0) {
		return <></>;
	}

	const validAttachments = attachments
		.filter((a) => a.mime_type && a.address)
		.map((a) => {
			const mediaType = mimeTypeToMediaType(a.mime_type!);
			if (!mediaType) {
				return null;
			}

			if (a.address) {
				const src = ipfsLinkToHttpLink(a.address);
				if (mediaType) {
					return {
						...a,
						src,
						mediaType,
					};
				}
			}

			return null;
		})
		.filter(notEmpty);

	const isMultiple = validAttachments.length > 1;

	const [embla, setEmbla] = useState<Embla | null>(null);
	const [emblaThumbs, setEmblaThumbs] = useState<Embla | null>(null);

	const [selectedIndex, setSelectedIndex] = useState<number>(0);

	const handleSelect = useCallback(() => {
		if (!embla || !emblaThumbs) return;
		setSelectedIndex(embla.selectedScrollSnap());
		emblaThumbs.scrollTo(embla.selectedScrollSnap());
	}, [embla, emblaThumbs, setSelectedIndex]);

	const handleThumbClick = useCallback(
		(index: number) => {
			if (!embla || !emblaThumbs) return;
			if (emblaThumbs.clickAllowed()) embla.scrollTo(index);
		},
		[embla, emblaThumbs]
	);

	useEffect(() => {
		if (embla) {
			handleSelect();
			embla.on("select", handleSelect);
		}
	}, [embla, handleSelect]);

	const renderAttachments = ({
		isThumbnail = false,
	}: {
		isThumbnail?: boolean;
	} = {}) => {
		return validAttachments.map((a, index) => {
			const mediaType = mimeTypeToMediaType(a.mime_type!);
			if (a.address) {
				const src = ipfsLinkToHttpLink(a.address);
				if (mediaType === "image") {
					return (
						<Carousel.Slide key={index}>
							<div className="bg-gray">
								<Image
									alt="image" // TODO: introduce alt in convention
									src={src}
									layout="fill"
									className={classNames("transition-opacity", {
										"opacity-20": isThumbnail && index !== selectedIndex,
									})}
									onClick={() => {
										if (!isThumbnail) {
											window.open(src);
										} else {
											handleThumbClick(index);
										}
									}}
								/>
							</div>
						</Carousel.Slide>
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
			{/* main */}

			<Carousel
				getEmblaApi={setEmbla}
				height={300}
				className="overflow-hidden relative w-full"
				// loop
				withIndicators={isMultiple}
				withControls={isMultiple}
			>
				{renderAttachments()}
			</Carousel>

			<Space h={10} />

			{/* thumbnails */}
			{attachments.length > 1 && (
				<Carousel
					getEmblaApi={setEmblaThumbs}
					height={100}
					slideSize="100px"
					className="overflow-hidden relative w-full"
					withIndicators={false}
					withControls={false}
					slidesToScroll={10}
					slideGap="md"
					dragFree
				>
					{renderAttachments({ isThumbnail: true })}
				</Carousel>
			)}
		</div>
	);
}
