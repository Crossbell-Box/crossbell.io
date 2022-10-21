import { PropsWithChildren, useState } from "react";
import BaseSection from "./BaseSection";
import WelcomeRing from "../components/WelcomeRing";
import { useMouse } from "@mantine/hooks";
import { AnimatePresence, m } from "framer-motion";

export default function VideoSection({}: PropsWithChildren<{}>) {
	const [showVideo, setShowVideo] = useState(false);
	const [showClose, setShowClose] = useState(false);

	const { x, y } = useMouse();

	return (
		<AnimatePresence>
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
					<m.div className="cursor-none">
						{/* overlay */}
						<m.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 0.8 }}
							exit={{ opacity: 0 }}
							className="absolute top-0 left-0 w-full h-full bg-black z-20"
							onClick={() => setShowVideo(false)}
						></m.div>

						{/* video */}
						<m.div
							initial={{
								opacity: 0,
								transform: "scale(0.1) translate(-50%,-50%)",
							}}
							animate={{
								opacity: 1,
								transform: "scale(1) translate(-50%,-50%)",
							}}
							exit={{
								opacity: 0,
								transform: "scale(0.1) translate(-50%,-50%)",
							}}
							className="absolute top-50% left-50% z-30 origin-top-left"
							onMouseEnter={() => setShowClose(false)}
							onMouseLeave={() => setShowClose(true)}
						>
							<div onClick={(e) => e.stopPropagation()}>
								<iframe
									className="max-w-screen w-1080px aspect-ratio-16/9 bg-black"
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
						</m.div>

						{/* close btn */}
						{showClose && (
							<m.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="absolute top-0 left-0 z-30 text-white pointer-events-none"
								style={{ x, y }}
								onClick={() => setShowVideo(false)}
							>
								<div className="translate--50%">
									<WelcomeRing withArrow={false} animate={false}>
										Close
									</WelcomeRing>
								</div>
							</m.div>
						)}
					</m.div>
				)}
			</BaseSection>
		</AnimatePresence>
	);
}
