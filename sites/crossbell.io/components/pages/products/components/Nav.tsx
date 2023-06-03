import { Box, Burger } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import classNames from "classnames";
import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";

export default function Nav({
	mode,
	index,
	onSwitchPage,
}: {
	mode: "light" | "dark";
	index: number;
	onSwitchPage: (index: number) => void;
}) {
	const navs = [
		{ title: "xSync", activeColor: "text-blue" },
		{ title: "xFeed", activeColor: "text-yellow" },
		{ title: "xCharacter", activeColor: "text-green" },
		{ title: "xLog", activeColor: "text-[#9688F2]" },
		{ title: "xShop", activeColor: "text-[#E65040]" },
	];

	const isLargeScreen = useMediaQuery("(min-width: 992px)", false, {
		getInitialValueInEffect: true,
	});
	const [opened, setOpened] = useState(false);
	const title = opened ? "Close navigation" : "Open navigation";

	const shouldShow =
		index !== 5 && // the video page
		(isLargeScreen || opened);

	const openedInSmallScreen = !isLargeScreen && opened;

	const handleSwitch = (i: number) => {
		if (openedInSmallScreen) {
			setOpened(false);
		}
		onSwitchPage?.(i);
	};

	return (
		<AnimatePresence>
			<>
				{/* burger menu */}
				<div className="fixed top-20px left-20px z-100">
					{!isLargeScreen && (
						<Burger
							color={mode === "dark" ? "#000000" : "#FFFFFF"}
							opened={opened}
							onClick={() => setOpened((o) => !o)}
							title={title}
						/>
					)}
				</div>

				{/* overlay */}
				{openedInSmallScreen && (
					<m.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className={classNames(
							"fixed top-0 left-0 w-full h-full z-99 backdrop-blur-50px",
							{
								"bg-white/50": mode === "dark",
								"bg-black/50": mode === "light",
							}
						)}
					></m.div>
				)}

				{(shouldShow || openedInSmallScreen) && (
					<Box>
						<m.nav
							className="fixed top-30% left-100px z-100 flex flex-col space-y-20px"
							transition={{ delay: 0.3 }}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							{navs.map((nav, i) => (
								<div
									key={i}
									onClick={() => handleSwitch(i)}
									className={classNames(
										"cursor-pointer transition-all text-xl font-500",
										{
											"text-white": index !== i && mode === "light",
											"text-black": index !== i && mode === "dark",
											"scale-120 translate-x-10%": index === i,
											[nav.activeColor]: index === i,
										}
									)}
								>
									{nav.title}
								</div>
							))}
						</m.nav>
					</Box>
				)}
			</>
		</AnimatePresence>
	);
}
