import { NoteMetadata } from "crossbell.js";
import { Carousel, Embla } from "@mantine/carousel";
import { Image } from "~/shared/components/image";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import { Modal, Space } from "@mantine/core";
import classNames from "classnames";
import {
	getValidAttachments,
	mimeTypeToMediaType,
} from "@crossbell/util-metadata";
import { useElementSize, useHotkeys } from "@mantine/hooks";
import VideoPlayer from "./video-player";
import { ipfsLinkToHttpLink } from "~/shared/ipfs";

export default function MediaCarousel({
	attachments = [],
	defaultSelectedIndex = 0,
	isOverlay = false,
	onTap,
}: {
	attachments: NoteMetadata["attachments"];
	defaultSelectedIndex?: number;
	isOverlay?: boolean;
	onTap?: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void;
}) {
	const [overlayOpened, setOverlayOpened] = useState(false);

	const validAttachments = getValidAttachments(attachments, {
		ipfsLinkToHttpLink,
		allowedContentTypes: ["address"],
		allowedMediaTypes: ["image", "video"],
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

	const { ref: mainRef, width: mainWidth } = useElementSize();

	// const mediaSm = useMediaQuery("(max-width: 900px)", false);

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
		[
			"Escape",
			() => {
				if (isOverlay) {
					setOverlayOpened(false);
				}
			},
		],
	]);

	// check clicking event
	const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
	const onMouseDown = useCallback(
		(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
			setDragStartPos({ x: e.screenX, y: e.screenY });
		},
		[]
	);
	const onMouseUp = useCallback(
		(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
			const dragX = Math.abs(dragStartPos.x - e.screenX);
			const dragY = Math.abs(dragStartPos.y - e.screenY);
			if (dragX < 5 && dragY < 5) {
				// console.log(`click with drag of ${dragX}, ${dragY}`);
				onTap?.(e);
			} else {
				// console.log(`click cancelled with drag of ${dragX}, ${dragY}`);
			}
		},
		[dragStartPos, onTap]
	);

	const renderAttachments = useCallback(
		({
			isThumbnail = false,
		}: {
			isThumbnail?: boolean;
		} = {}) => {
			return validAttachments.map((a, index) => {
				const mediaType = mimeTypeToMediaType(a.mime_type!);
				if (a.address) {
					const src = a.address;
					if (mediaType === "image") {
						return (
							<Carousel.Slide key={index}>
								<div
									className={classNames(
										"relative overflow-hidden flex justify-center items-center",
										{
											"h-300px": !isThumbnail && !isOverlay,
											"h-80vh": !isThumbnail && isOverlay,
											"h-100px rounded-md": isThumbnail,
										}
									)}
									data-overlay-tap-area="1"
								>
									{!isThumbnail && isOverlay ? (
										<img
											src={ipfsLinkToHttpLink(src)}
											className="max-h-80vh max-w-full"
										/>
									) : (
										<Image
											alt={a.alt ?? "image"}
											src={src}
											className={classNames("transition-opacity object-cover", {
												"opacity-20": isThumbnail && index !== selectedIndex,
												"cursor-zoom-in": !isThumbnail && !isOverlay,
											})}
											fill={!isThumbnail}
											sizes={
												!isThumbnail
													? "(min-width: 75em) 33vw, (min-width: 48em) 50vw, 100vw"
													: undefined
											}
											width={isThumbnail ? 100 : undefined}
											height={isThumbnail ? 100 : undefined}
											onClick={() => {
												if (!isThumbnail && !isOverlay) {
													setOverlayOpened(true);
												} else {
													handleThumbClick(index);
												}
											}}
										/>
									)}
								</div>
							</Carousel.Slide>
						);
					}

					if (mediaType === "video") {
						return (
							<Carousel.Slide key={index}>
								<div
									className={classNames("flex justify-center items-center", {
										"h-300px": !isThumbnail && !isOverlay,
										"h-80vh": !isThumbnail && isOverlay,
										"h-100px rounded-md": isThumbnail,
									})}
									style={{ width: mainWidth }}
								>
									{/* TODO: should not be in thumbnail */}
									<VideoPlayer url={src} controls />
								</div>
							</Carousel.Slide>
						);
					}
				}

				return <Carousel.Slide key={index}></Carousel.Slide>;
			});
		},
		[validAttachments, isOverlay, mainWidth]
	);

	if (!validAttachments || validAttachments?.length === 0) {
		return <></>;
	}

	return (
		<div
			className="overflow-hidden"
			onClick={(e) => {
				e.stopPropagation();
			}}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
		>
			<Modal
				withinPortal
				classNames={{
					header: "bg-transparent justify-end",
					content: "backdrop-blur-lg bg-white/20",
				}}
				yOffset={0}
				fullScreen
				opened={overlayOpened}
				onClose={() => setOverlayOpened(false)}
				onClick={(e) => {
					setOverlayOpened(false);
				}}
				// withCloseButton={false}
			>
				<MediaCarousel
					attachments={attachments}
					isOverlay
					defaultSelectedIndex={selectedIndex}
					onTap={(e) => {
						// @ts-ignore
						if (e.target.dataset.overlayTapArea) {
							setOverlayOpened(false);
						}
					}}
				/>
			</Modal>

			<div ref={mainRef}></div>

			{/* main */}
			<div>
				<Carousel
					getEmblaApi={setEmbla}
					height={isOverlay ? "80vh" : 300}
					className="overflow-hidden w-full rounded-md"
					loop
					withIndicators={isMultiple}
					withControls={isMultiple}
				>
					{renderAttachments()}
				</Carousel>
			</div>

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
					slideGap="md"
					dragFree
				>
					{renderAttachments({ isThumbnail: true })}
				</Carousel>
			)}
		</div>
	);
}
