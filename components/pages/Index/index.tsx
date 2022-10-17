import {
	domAnimation,
	LazyMotion,
	m,
	useTime,
	useTransform,
} from "framer-motion";
import PhilosophySection from "./Sections/PhilosophySection";
import Logo from "./components/Logo";
import Nav from "./components/Nav";
import Carousel from "./components/Carousel";
import { useState } from "react";
import ParallaxSection from "./Sections/ParallaxSection";

import syncImage from "@/public/images/pages/index/resources/sync.webp";
import characterImage from "@/public/images/pages/index/resources/character.webp";
import xlogImage from "@/public/images/pages/index/resources/xlog.webp";
import shopImage from "@/public/images/pages/index/resources/shop.webp";
import feedImage from "@/public/images/pages/index/resources/feed.webp";
import feedScrollingImage from "@/public/images/pages/index/resources/feed-scroll.webp";
import Image from "@/components/common/Image";
import VideoSection from "./Sections/VideoSection";
import FooterSection from "./Sections/FooterSection";
import ScrollBall from "./components/ScrollBall";
import { useHotkeys } from "@mantine/hooks";
import Loading from "./components/Loading";

export default function Index() {
	const [index, setIndex] = useState(0);

	useHotkeys([
		["ArrowUp", () => setIndex((index) => (index === 0 ? 0 : index - 1))],
		["ArrowDown", () => setIndex((index) => (index === 7 ? 7 : index + 1))],
	]);

	const time = useTime();
	const y = useTransform(time, (v) => Math.cos(v / 3000) * 350 - 350);

	return (
		<LazyMotion features={domAnimation} strict>
			<Logo mode={index === 0 ? "light" : "dark"} />

			{index === 7 && <Logo mode="dark" position="bottom-left" />}

			<Nav
				index={index}
				mode={index === 0 ? "light" : "dark"}
				onSwitchPage={(i) => setIndex(i)}
			/>

			<Loading />

			<main>
				<Carousel index={index} onIndexChange={(i) => setIndex(i)}>
					{/* 0 */}
					<PhilosophySection
						currentPageIndex={index}
						onClickNext={() => setIndex(index + 1)}
					/>

					{/* 1 */}
					<ParallaxSection
						sectionIndex={1}
						currentPageIndex={index}
						title="Sync to own"
						description="Sync your social media content on Crossbell. Go from a user to an owner."
						btnText="Sync now"
						btnHoverClassName="hover:bg-blue"
						link="/sync"
						image={syncImage}
					/>
					{/* 2 */}
					<ParallaxSection
						sectionIndex={2}
						currentPageIndex={index}
						title="Meet stories"
						description="Browser the content synced from other characters you follow."
						btnText="Browse now"
						btnHoverClassName="hover:bg-yellow group"
						link="/feed"
						image={feedImage}
					>
						<Image src={feedImage} className="w-800px max-w-screen h-auto" />
						<div className="absolute left-25% top--5% h-600px overflow-hidden hover:shadow-lg hover:scale-110 transition-all-300">
							<m.div style={{ y }}>
								<Image src={feedScrollingImage} className="w-350px h-auto" />
							</m.div>
						</div>
					</ParallaxSection>
					{/* 3 */}
					<ParallaxSection
						sectionIndex={3}
						currentPageIndex={index}
						title="All about your characters"
						description="All about your character can be managed and shown in xCharacter."
						btnText="Search now"
						btnHoverClassName="hover:bg-green"
						link="/search"
						image={characterImage}
					/>
					{/* 4 */}
					<ParallaxSection
						sectionIndex={4}
						currentPageIndex={index}
						title="Blog Free"
						description="xLog is an on-chain and open-source blogging platform for everyone."
						btnText="Write now"
						btnHoverClassName="hover:bg-[#9688F2]"
						link="https://xlog.app"
						image={xlogImage}
					/>
					{/* 5 */}
					<ParallaxSection
						sectionIndex={5}
						currentPageIndex={index}
						title="xShop"
						description="Manage and trade your assets generated in xShop."
						btnText="Coming Soon"
						btnHoverClassName="hover:bg-[#E65040]"
						link="#"
						image={shopImage}
					/>

					{/* 6 */}
					<VideoSection />

					{/* 7 */}
					<FooterSection onClickTop={() => setIndex(0)} />
				</Carousel>
			</main>

			<ScrollBall index={index} onClickNext={() => setIndex(index + 1)} />
		</LazyMotion>
	);
}
