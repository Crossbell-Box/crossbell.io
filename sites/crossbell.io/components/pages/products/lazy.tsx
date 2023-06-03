import { m, useMotionTemplate, useTime, useTransform } from "framer-motion";
import { useMediaQuery } from "@mantine/hooks";

import { Image } from "~/shared/components/image";
import config from "~/shared/config";

// images
import syncImage from "@/public/images/pages/index/resources/sync.webp";
import characterImage from "@/public/images/pages/index/resources/character.webp";
import xlogImage from "@/public/images/pages/index/resources/xlog.webp";
import shopImage from "@/public/images/pages/index/resources/shop.webp";
import feedImage from "@/public/images/pages/index/resources/feed.webp";
import feedScrollingImage from "@/public/images/pages/index/resources/feed-scroll.webp";

import Logo from "./components/Logo";
import Nav from "./components/Nav";
import ScrollBall from "./components/ScrollBall";
import ParallaxSection from "./Sections/ParallaxSection";
import FooterSection from "./Sections/FooterSection";
import VideoSection from "./Sections/VideoSection";
import Loading from "./components/Loading";
import { useScroller } from "./utils";

export default function LazyIndex() {
	const { index, setIndex } = useScroller(6);

	return (
		<>
			<Logo mode="dark" />

			{index === 6 && (
				<div className="hidden sm:block">
					<Logo mode="dark" position="bottom-left" />
				</div>
			)}

			<Nav index={index} mode="dark" onSwitchPage={(i) => setIndex(i)} />

			<ScrollBall index={index} onClickNext={() => setIndex(index + 1)} />

			<Loading />

			<main>
				<style global jsx>{`
					html {
						scroll-snap-type: y mandatory;
					}
					section {
						height: 100vh;
						scroll-snap-align: center;
						perspective: 500px;
					}
				`}</style>

				{/* 1 */}
				<ParallaxSection
					title="Sync to own"
					description="Sync your social media content on Crossbell. Go from a user to an owner."
					btnText="Sync now"
					btnHoverClassName="hover:bg-blue"
					link={config.xSync.domain}
					image={syncImage}
				/>
				{/* 2 */}
				<ParallaxSection
					title="Meet stories"
					description="Browser the content synced from other characters you follow."
					btnText="Browse now"
					btnHoverClassName="hover:bg-yellow group"
					link="/feed"
					image={feedImage}
				>
					<FeedImage />
				</ParallaxSection>
				{/* 3 */}
				<ParallaxSection
					title="All about your characters"
					description="All about your character can be managed and shown in xCharacter."
					btnText="Search now"
					btnHoverClassName="hover:bg-green"
					link={config.xChar.domain}
					image={characterImage}
				/>
				{/* 4 */}
				<ParallaxSection
					title="Blog Free"
					description="xLog is an on-chain and open-source blogging platform for everyone."
					btnText="Write now"
					btnHoverClassName="hover:bg-[#9688F2]"
					link="https://xlog.app"
					image={xlogImage}
				/>
				{/* 5 */}
				<ParallaxSection
					title="xShop"
					description="Manage and trade your assets generated in xShop."
					btnText="Shop now"
					btnHoverClassName="hover:bg-[#E65040]"
					link="/shop"
					image={shopImage}
				/>

				{/* 6 */}
				<VideoSection />

				{/* 7 */}
				<FooterSection onClickTop={() => setIndex(0)} />
			</main>
		</>
	);
}

function FeedImage() {
	const time = useTime();
	// width : height = 35vw : 128vw
	// scroll range : 0 ~ 70vw
	const isSmallScreen = useMediaQuery("(max-width: 800px)");

	const y = useTransform(
		time,
		(v) =>
			isSmallScreen
				? Math.cos(v / 3000) * 35 - 35 // vw
				: Math.cos(v / 3000) * 350 - 350 // px
	);
	const transformInVw = useMotionTemplate`translateY(${y}vw)`;
	const transformInPx = useMotionTemplate`translateY(${y}px)`;

	return (
		<>
			<Image
				src={feedImage}
				className="w-80vw sm:w-800px max-w-screen h-auto"
			/>
			<div className="absolute left-25% top--5% h-600px overflow-hidden hover:shadow-lg hover:scale-110 transition-all-300">
				<m.div
					style={{ transform: isSmallScreen ? transformInVw : transformInPx }}
				>
					<Image
						src={feedScrollingImage}
						className="w-35vw sm:w-350px h-auto"
					/>
				</m.div>
			</div>
		</>
	);
}
