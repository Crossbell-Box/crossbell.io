import React from "react";
import { Carousel, Embla } from "@mantine/carousel";

import { Header } from "../../components/header";
import { useModalStore } from "../../stores";

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
			<div className={styles.scene1Illustration}>
				<div className={styles.scene1IllustrationArrowDown}>
					<ArrowDown />
				</div>
				<div className={styles.scene1IllustrationWallet}>
					<Wallet />
				</div>
				<div className={styles.scene1IllustrationAirplane}>
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
				<div className={styles.scene2Illustration}>
					<div className={styles.scene2IllustrationWalletContainer}>
						<Wallet className={styles.scene2IllustrationWallet} />
					</div>
					<span className={styles.scene2IllustrationHash}>0x2a06...84AD</span>
					<Key className={styles.scene2IllustrationKey} />
				</div>
			</div>
		),
	},
	{
		headerTitle: "About Email",
		title: "Web2 transition journey",
		description:
			"We also support email connection, and it’s more like a Newbie Valley to onboard and gives you a smooth transition journey.",
		learnMoreLink: "https://crossbell-blog.xlog.app/newbie-villa",
		illustration: (
			<div className={styles.scene3Illustration}>
				<Email />
			</div>
		),
	},
];

export function AboutWallets() {
	const [embla, setEmbla] = React.useState<Embla | null>(null);
	const [index, setIndex] = React.useState(0);
	const currentScene = React.useMemo(() => scenes[index], [index]);
	const setModalCanHide = useModalStore((s) => s.setCanHide);

	React.useEffect(() => {
		if (embla) {
			let setCanHideTimeout: number;

			const onSelect = () => setIndex(embla.selectedScrollSnap());
			const setCanNotHide = () => setModalCanHide(false);
			const setCanHide = () => {
				window.clearTimeout(setCanHideTimeout);
				setCanHideTimeout = window.setTimeout(() => setModalCanHide(true), 500);
			};

			embla.on("pointerDown", setCanNotHide);
			embla.on("pointerUp", setCanHide);
			embla.on("select", onSelect);

			return () => {
				window.clearTimeout(setCanHideTimeout);
				embla.off("select", onSelect);
			};
		}
	}, [embla, setModalCanHide]);

	return (
		<div>
			<Header title={currentScene.headerTitle} />
			<div
				className={styles.container}
				data-animation="scale-fade-in"
				onAnimationEnd={() => embla?.reInit()}
			>
				<Carousel
					getEmblaApi={setEmbla}
					sx={{ width: 320 }}
					withControls={false}
					withIndicators
					classNames={{
						indicator: styles.indicator,
						indicators: styles.indicators,
					}}
				>
					{scenes.map((scene) => (
						<Carousel.Slide key={scene.title} className={styles.slide}>
							<div className={styles.slideLayout}>
								<div className={styles.slideIllustration}>
									{scene.illustration}
								</div>
								<h3 className={styles.slideTitle}>{scene.title}</h3>
								<p className={styles.slideDesc}>{scene.description}</p>
							</div>
						</Carousel.Slide>
					))}
				</Carousel>

				<a
					href={currentScene.learnMoreLink}
					target="_blank"
					rel="noreferrer"
					className={styles.learnMoreLink}
				>
					<button className={styles.learnMoreBtn}>Learn More</button>
				</a>
			</div>
		</div>
	);
}
