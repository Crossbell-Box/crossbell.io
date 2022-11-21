import React from "react";
import classNames from "classnames";
import { Carousel, Embla } from "@mantine/carousel";

import { Header } from "../../components/header";

import { Airplane, ArrowDown, Wallet, Key, Email } from "./icons";
import styles from "./index.module.css";

type SceneConfig = {
	headerTitle: string;
	title: string;
	description: string;
	learnMoreLink: string;
	illustration: React.ReactNode;
};

const scenes: SceneConfig[] = [
	{
		headerTitle: "About Wallets",
		title: "For your digital assets",
		description:
			"Wallets let you send, receive, store, and interact with digital assets like NFTs and other Ethereum tokens.",
		learnMoreLink:
			"https://docs.ethhub.io/using-ethereum/wallets/intro-to-ethereum-wallets/",
		illustration: (
			<div className="relative w-full h-full">
				<div
					className="w-76px h-76px rounded-full bg-[#6366F1] absolute left-25% top-50% z-0 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
					style={{ boxShadow: "0px 2px 10px rgba(99, 102, 241, 0.3)" }}
				>
					<ArrowDown />
				</div>
				<div
					className="w-112px h-112px rounded-full absolute left-50% top-50% z-1 transform -translate-x-1/2 -translate-y-1/2 bg-white flex items-center justify-center"
					style={{ boxShadow: "0px 3px 15px rgba(0, 0, 0, 0.1)" }}
				>
					<Wallet />
				</div>
				<div
					className="w-76px h-76px rounded-full bg-[#3897FB] absolute right-25% top-50% z-0 transform translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
					style={{ boxShadow: "0px 2px 10px rgba(56, 151, 251, 0.3)" }}
				>
					<Airplane />
				</div>
			</div>
		),
	},
	{
		headerTitle: "About Wallets",
		title: "A better way to login",
		description:
			"With modern apps, your wallet can be used as an easy way to login, instead of having to remember a password.",
		learnMoreLink:
			"https://docs.ethhub.io/using-ethereum/wallets/intro-to-ethereum-wallets/",
		illustration: (
			<div>
				<div
					className="p-12px rounded-16px flex items-center relative"
					style={{ boxShadow: "0px 2px 9px rgba(0, 0, 0, 0.07)" }}
				>
					<div
						className="w-32px h-32px mr-12px bg-white flex items-center justify-center rounded-full"
						style={{ boxShadow: "0px 2px 5px rgba(37, 41, 46, 0.16)" }}
					>
						<Wallet className="w-16px h14px" />
					</div>
					<span className="mr-40px font-500 text-18px">0x2a06...84AD</span>
					<Key className="absolute -top-18px -right-28px" />
				</div>
			</div>
		),
	},
	{
		headerTitle: "About Email",
		title: "Web2 transition journey",
		description:
			"We also support email connection, and it’s more like a Newbie Valley to onboard and gives you a smooth transition journey.",
		// TODO: add link
		learnMoreLink: "",
		illustration: (
			<div className="flex items-center relative">
				<Email />
			</div>
		),
	},
];

export function AboutWallets() {
	const [embla, setEmbla] = React.useState<Embla | null>(null);
	const [index, setIndex] = React.useState(0);
	const currentScene = React.useMemo(() => scenes[index], [index]);

	React.useEffect(() => {
		if (embla) {
			const onSelect = () => setIndex(embla.selectedScrollSnap());

			embla.on("select", onSelect);

			return () => {
				embla.off("select", onSelect);
			};
		}
	}, [embla]);

	return (
		<div>
			<Header title={currentScene.headerTitle} />
			<div className="px-24px pb-27px" data-animation="scale-fade-in" onAnimationEnd={() => embla?.reInit()}>
				<Carousel
					getEmblaApi={setEmbla}
					sx={{ width: 320 }}
					withControls={false}
					withIndicators
					classNames={{
						indicator: classNames(
							"w-16px h-3px flex-shrink-0",
							styles.indicator
						),
						indicators: classNames("gap-4px items-center", styles.indicators),
					}}
				>
					{scenes.map((scene) => (
						<Carousel.Slide key={scene.title} className="w-full text-center">
							<div className="pb-52px">
								<div className="h-217px flex items-center justify-center">
									{scene.illustration}
								</div>
								<h3 className="mt-0 mb-8px text-16px font-500">
									{scene.title}
								</h3>
								<p className="m-0 text-14px font-400 text-[#999]">
									{scene.description}
								</p>
							</div>
						</Carousel.Slide>
					))}
				</Carousel>

				<a
					href={currentScene.learnMoreLink}
					target="_blank"
					rel="noreferrer"
					className="flex"
				>
					<button className="w-full h-48px bg-[#F6F7F9] text-black text-14px font-500 border-none cursor-pointer rounded-16px font-roboto">
						Learn More
					</button>
				</a>
			</div>
		</div>
	);
}

export function useSceneState(scenes: SceneConfig[]) {
	const [currentIndex, setCurrentIndex] = React.useState(0);

	return React.useMemo(() => {
		const move = (direction: number) => {
			const nextIndex =
				(scenes.length + currentIndex + direction) % scenes.length;

			setCurrentIndex(nextIndex);
		};

		return {
			currentIndex,
			currentScene: scenes[currentIndex],
			goNext: () => move(1),
			goPrev: () => move(-1),
			goTo: (nextIndex: number) => {
				setCurrentIndex(Math.min(Math.max(0, nextIndex), scenes.length - 1));
			},
		};
	}, [scenes, currentIndex]);
}
