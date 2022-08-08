import { ipfsLinkToHttpLink } from "@/utils/ipfs";
import { NoteMetadata } from "crossbell.js";
import { Carousel, Embla } from "@mantine/carousel";
import Image from "../Image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Space } from "@mantine/core";
import classNames from "classnames";
import { getValidAttachments, mimeTypeToMediaType } from "@/utils/metadata";

export default function MediaCarousel({
	attachments = [],
}: {
	attachments: NoteMetadata["attachments"];
}) {
	const validAttachments = getValidAttachments(attachments, {
		withAddressOnly: true,
	});

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
									height={isThumbnail ? 100 : undefined}
									width={isThumbnail ? 100 : undefined}
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

	if (!attachments || attachments?.length === 0) {
		return <></>;
	}

	return (
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
