import { ipfsLinkToHttpLink } from "@/utils/ipfs";
import { NoteMetadata } from "crossbell.js";
import { Carousel, Embla } from "@mantine/carousel";
import Image from "../Image";
import { useCallback, useEffect, useState } from "react";
import { Modal, Space } from "@mantine/core";
import classNames from "classnames";
import { getValidAttachments, mimeTypeToMediaType } from "@/utils/metadata";
import { useHotkeys, useMediaQuery } from "@mantine/hooks";

export default function MediaCarousel({
	attachments = [],
	defaultSelectedIndex = 0,
	isOverlay = false,
}: {
	attachments: NoteMetadata["attachments"];
	defaultSelectedIndex?: number;
	isOverlay?: boolean;
}) {
	const [overlayOpened, setOverlayOpened] = useState(false);

	const validAttachments = getValidAttachments(attachments, {
		allowedContentTypes: ["address"],
	});

	const isMultiple = validAttachments.length > 1;

	const [embla, setEmbla] = useState<Embla | null>(null);
	const [emblaThumbs, setEmblaThumbs] = useState<Embla | null>(null);

	const [selectedIndex, setSelectedIndex] =
		useState<number>(defaultSelectedIndex);

	const handleSelect = useCallback(() => {
		if (!embla || !emblaThumbs) return;
		setSelectedIndex(embla.selectedScrollSnap());
	}, [embla, emblaThumbs, setSelectedIndex]);

	// scroll to selected index
	useEffect(() => {
		if (!embla || !emblaThumbs) return;
		emblaThumbs.scrollTo(selectedIndex);
		embla.scrollTo(selectedIndex);
	}, [embla, emblaThumbs, selectedIndex]);

	const handleThumbClick = useCallback(
		(index: number) => {
			if (emblaThumbs?.clickAllowed()) {
				setSelectedIndex(index);
			}
		},
		[emblaThumbs]
	);

	useEffect(() => {
		if (embla) {
			handleSelect();
			embla.on("select", handleSelect);
		}
	}, [embla, handleSelect]);

	// reinit to prevent position shifting
	const [reInited, setReInited] = useState(false);
	if (isOverlay && embla && emblaThumbs && !reInited) {
		setTimeout(() => {
			embla.reInit(); // to keep the scroll position correctly calculated
			// emblaThumbs.reInit(); // will cause shifting. need a better way to do this
			setReInited(true);
		}, 250);
	}

	const mediaSm = useMediaQuery("(max-width: 900px)", false);

	// switching keys
	useHotkeys([
		[
			"ArrowLeft",
			() => {
				if (isOverlay) {
					const length = validAttachments.length;
					setSelectedIndex((selectedIndex + length - 1) % length);
				}
			},
		],
		[
			"ArrowRight",
			() => {
				if (isOverlay) {
					const length = validAttachments.length;
					setSelectedIndex((selectedIndex + 1) % length);
				}
			},
		],
	]);

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
										if (!isThumbnail && !isOverlay) {
											setOverlayOpened(true);
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
			className="overflow-hidden"
			onClick={(e) => {
				e.stopPropagation();
			}}
		>
			<Modal
				size="100vw"
				fullScreen={mediaSm}
				centered
				opened={overlayOpened}
				onClose={() => setOverlayOpened(false)}
				// withCloseButton={false}
			>
				<MediaCarousel
					attachments={attachments}
					isOverlay
					defaultSelectedIndex={selectedIndex}
				/>
			</Modal>

			{/* main */}
			<Carousel
				getEmblaApi={setEmbla}
				height={isOverlay ? "70vh" : 300}
				className="overflow-hidden w-full"
				loop
				withIndicators={isMultiple}
				withControls={isMultiple}
			>
				{renderAttachments()}
			</Carousel>

			<Space h={10} />

			{/* thumbnails */}
			{isMultiple && (
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
