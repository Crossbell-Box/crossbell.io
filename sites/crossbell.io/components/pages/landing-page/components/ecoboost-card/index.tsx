import React from "react";
import Image from "next/image";
import classNames from "classnames";

import logoGIF from "./crossbell_logo.gif";

const KEY = "isHideEcoBoostCard";

export function EcoBoostCard() {
	const [isActive, setIsActive] = React.useState(false);

	React.useEffect(() => {
		if (localStorage.getItem(KEY) !== "true") {
			setIsActive(true);
		}
	}, []);

	return (
		<div
			className={classNames(
				"px-6 z-10 absolute top-18 right-1/2 translate-x-1/2 w-full pointer-events-none transition",
				isActive ? "opacity-100" : "opacity-0"
			)}
		>
			<div className="max-w-[1920px] mx-auto w-full flex justify-center sm:justify-end">
				<div
					className={classNames(
						"relative",
						isActive ? "pointer-events-auto" : "pointer-events-none"
					)}
				>
					<a
						href="https://ecoboost.crossbell.io/"
						target="_blank"
						className="flex w-[346px] gap-3 max-w-full items-center p-3 rounded-[20px] bg-[#F4F4F4]"
					>
						<Image
							src={logoGIF}
							alt="Crossbell Logo"
							className="w-[80px] h-[80px] object-fit rounded-3"
						/>

						<div>
							<h4 className="w-44 text-black text-xl font-medium m-0">
								Become the EcoBoost star now
							</h4>

							<div className="text-black text-opacity-20 text-sm font-normal mt-2">
								Crossbell Grants
							</div>
						</div>
					</a>

					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
						className="transition absolute right-3 top-3 cursor-pointer bg-[#E9E9E9] rounded-[10px] hover:bg-[#e1e1e1] active:bg-[#d1d1d1]"
						onClick={() => {
							localStorage.setItem(KEY, `${isActive}`);
							setIsActive(false);
						}}
					>
						<path
							d="M6.25 13.75L13.75 6.25"
							stroke="#B9BABC"
							strokeWidth="2"
							strokeLinecap="round"
						/>
						<path
							d="M6.25 6.25L13.75 13.75"
							stroke="#B9BABC"
							strokeWidth="2"
							strokeLinecap="round"
						/>
					</svg>
				</div>
			</div>
		</div>
	);
}
