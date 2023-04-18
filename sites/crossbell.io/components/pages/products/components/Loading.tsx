import { Text } from "@mantine/core";
import { AnimatePresence, m } from "framer-motion";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";

export default function Loading() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [show, setShow] = useState(true);

	useEffect(() => {
		const handleStart = (url: string) => {
			url !== router.pathname ? setLoading(true) : setLoading(false);
		};
		const handleComplete = (url: string) => setLoading(false);

		router.events.on("routeChangeStart", handleStart);
		router.events.on("routeChangeComplete", handleComplete);
		router.events.on("routeChangeError", handleComplete);
	}, [router]);

	const width = loading ? "90%" : "100%";

	const handleProgressEnd = useCallback(() => {
		if (!loading) {
			setShow(false);
		}
	}, [loading]);

	useEffect(() => {
		if (!loading) {
			setTimeout(() => {
				setShow(false);
			}, 1000);
		}
	}, [loading]);

	return (
		<AnimatePresence>
			{show && (
				<m.section
					initial={{ opacity: 0.8, scale: 1.5 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 3 }}
					transition={{ duration: 0.5 }}
					className="bg-black flex flex-col items-center justify-center h-screen w-screen fixed left-0 right-0 z-100"
				>
					<Text className="font-deca font-400 text-white text-4xl fixed top-50% translate-y--50% z-3">
						Crossbell
					</Text>

					{/* progress bar */}
					<m.div
						initial={{ width: "0%" }}
						animate={{ width }}
						transition={{ duration: 1, ease: "easeInOut" }}
						onAnimationEnd={handleProgressEnd}
						className="h-8px fixed top-50% left-0 translate-y--50% z-2"
						style={{
							background:
								"linear-gradient(90deg, #F6C549 0%, #E65040 23.44%, #9688F2 50.52%, #5B89F7 76.04%, #6AD991 100%)",
						}}
					></m.div>
				</m.section>
			)}
		</AnimatePresence>
	);
}
