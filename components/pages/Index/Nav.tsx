import classNames from "classnames";
import { AnimatePresence, m } from "framer-motion";
import { useCallback, useState } from "react";

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
		{ title: "Philosophy", activeColor: "text-white" },
		{ title: "xSync", activeColor: "text-blue" },
		{ title: "xFeed", activeColor: "text-yellow" },
		{ title: "xCharacter", activeColor: "text-green" },
		{ title: "xLog", activeColor: "text-[#9688F2]" },
		{ title: "xShop", activeColor: "text-[#E65040]" },
	];

	const handleSwitch = (i: number) => {
		onSwitchPage?.(i);
	};

	const shouldShow = index !== 6; // the video page

	return (
		<AnimatePresence>
			{shouldShow && (
				<m.nav
					className="fixed top-30% left-100px z-10 flex flex-col space-y-20px"
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
			)}
		</AnimatePresence>
	);
}
