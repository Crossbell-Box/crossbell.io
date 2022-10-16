import { PropsWithChildren, useState } from "react";
import BaseSection from "./BaseSection";
import WelcomeRing from "../components/WelcomeRing";

export default function VideoSection({}: PropsWithChildren<{}>) {
	const [showVideo, setShowVideo] = useState(false);

	return (
		<BaseSection className="relative flex flex-row justify-center items-start">
			<video
				src="/images/pages/index/resources/intro-preview.mp4"
				className="h-screen"
				autoPlay
				playsInline
				muted
				loop
				controls={false}
			></video>

			<div
				className="absolute top-50% left-50% translate--50% z-10 text-black cursor-pointer"
				onClick={() => setShowVideo(true)}
			>
				<WelcomeRing withArrow={false}>Play</WelcomeRing>
			</div>

			{showVideo && (
				<div>
					{/* overlay */}
					<div
						className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-20"
						onClick={() => setShowVideo(false)}
					></div>

					{/* video */}
					<div className="absolute top-50% left-50% translate--50% z-30">
						<div onClick={(e) => e.stopPropagation()}>
							<iframe
								className="max-w-screen w-600px aspect-ratio-16/9 bg-black"
								frameBorder="0"
								allowFullScreen
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								title="Crossbell Introduction"
								width="100%"
								height="100%"
								src="https://www.youtube.com/embed/Txq26_SI6XE?autoplay=0&amp;mute=0&amp;controls=1&amp;origin=http%3A%2F%2Flocalhost%3A3000&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;iv_load_policy=3&amp;modestbranding=1&amp;enablejsapi=1&amp;widgetid=1"
								id="widget2"
							></iframe>
						</div>
					</div>

					{/* close btn */}
					<div
						className="absolute bottom-10% left-50% translate--50% z-30 text-white cursor-pointer"
						onClick={() => setShowVideo(false)}
					>
						<WelcomeRing withArrow={false}>Close</WelcomeRing>
					</div>
				</div>
			)}
		</BaseSection>
	);
}
