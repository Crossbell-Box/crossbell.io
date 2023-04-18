import React from "react";
import Image from "next/image";
import { m } from "framer-motion";

import avatarUrl from "./avatar.png";
import bannerUrl from "./banner.png";
import addToAppleWalletImg from "../back/add-to-apple-wallet.png";

export function Front({ isActive }: { isActive: boolean }) {
	return (
		<div className="relative w-full h-full">
			<svg
				viewBox="0 0 329 442"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				className="w-full h-full"
			>
				<rect x={1} y={1} width={327} height={440} rx={24} fill="white" />
				<path
					d="M1 25C1 11.7452 11.7452 1 25 1H304C317.255 1 328 11.7452 328 25V133H1V25Z"
					fill="url(#pattern0)"
				/>
				<path
					d="M1 25C1 11.7452 11.7452 1 25 1H304C317.255 1 328 11.7452 328 25V133H1V25Z"
					fill="url(#pattern1)"
				/>
				<rect
					x={124}
					y={92}
					width={82}
					height={82}
					rx={41}
					fill="url(#pattern2)"
					stroke="white"
					strokeWidth={4}
				/>
				<text
					fill="#082135"
					xmlSpace="preserve"
					style={{ whiteSpace: "pre" }}
					fontFamily="Lexend Deca"
					fontSize={14}
					letterSpacing="0.1px"
				>
					<tspan x="57.5" y="158.75">
						49
					</tspan>
				</text>
				<text
					fill="#687792"
					xmlSpace="preserve"
					style={{ whiteSpace: "pre" }}
					fontFamily="Lexend Deca"
					fontSize={14}
					letterSpacing="0.25px"
				>
					<tspan x={33} y="178.75">
						Followers
					</tspan>
				</text>
				<text
					fill="#082135"
					xmlSpace="preserve"
					style={{ whiteSpace: "pre" }}
					fontFamily="Lexend Deca"
					fontSize={14}
					letterSpacing="0.1px"
				>
					<tspan x="254.5" y="158.75">
						62
					</tspan>
				</text>
				<text
					fill="#687792"
					xmlSpace="preserve"
					style={{ whiteSpace: "pre" }}
					fontFamily="Lexend Deca"
					fontSize={14}
					letterSpacing="0.25px"
				>
					<tspan x={229} y="178.75">
						Following
					</tspan>
				</text>
				<text
					fill="black"
					xmlSpace="preserve"
					style={{ whiteSpace: "pre" }}
					fontFamily="Lexend Deca"
					fontSize={22}
					fontWeight={600}
					letterSpacing="0em"
				>
					<tspan x="114.5" y="235.75">
						Crossbell
					</tspan>
				</text>
				<text
					fill="#999999"
					xmlSpace="preserve"
					style={{ whiteSpace: "pre" }}
					fontFamily="Lexend Deca"
					fontSize={16}
					fontWeight={300}
					letterSpacing="0.15px"
				>
					<tspan x={122} y="263.5">
						@Crossbell
					</tspan>
				</text>
				<text
					fill="black"
					xmlSpace="preserve"
					style={{ whiteSpace: "pre" }}
					fontFamily="Lexend Deca"
					fontSize={16}
					fontWeight={200}
					letterSpacing="0.15px"
				>
					<tspan x="60.4281" y={315}>
						The freedom to decentralize{" "}
					</tspan>
					<tspan x="96.4594" y={339}>
						your social media.
					</tspan>
				</text>
				<line
					x1={18}
					y1="360.5"
					x2={311}
					y2="360.5"
					stroke="#E1E8F7"
					strokeLinecap="round"
				/>
				<rect x={17} y={377} width={295} height={48} rx={12} fill="#3A3A3A" />
				<text
					fill="white"
					xmlSpace="preserve"
					style={{ whiteSpace: "pre" }}
					fontFamily="Lexend Deca"
					fontSize={16}
					letterSpacing="0.15px"
				>
					<tspan x="71.5" y={407}>
						Mint you own character
					</tspan>
				</text>
				<rect
					x="0.5"
					y="0.5"
					width={328}
					height={441}
					rx="24.5"
					stroke="#E1E8F7"
					strokeOpacity="0.4"
				/>
				<defs>
					<pattern
						id="pattern0"
						patternContentUnits="objectBoundingBox"
						width={1}
						height={1}
					>
						<use
							xlinkHref="#image0_6867_24745"
							transform="matrix(0.00183371 0 0 0.00454261 -1.06177 -1.24214)"
						/>
					</pattern>
					<pattern
						id="pattern1"
						patternContentUnits="objectBoundingBox"
						width={1}
						height={1}
					>
						<use
							xlinkHref="#image1_6867_24745"
							transform="matrix(0.00155658 0 0 0.00385608 -0.00740796 -1.52214)"
						/>
					</pattern>
					<pattern
						id="pattern2"
						patternContentUnits="objectBoundingBox"
						width={1}
						height={1}
					>
						<use xlinkHref="#image2_6867_24745" transform="scale(0.0025)" />
					</pattern>
					<image
						id="image0_6867_24745"
						width={1500}
						height={500}
						xlinkHref={bannerUrl.src}
					/>
					<image
						id="image2_6867_24745"
						width={400}
						height={400}
						xlinkHref={avatarUrl.src}
					/>
				</defs>
			</svg>

			<m.div
				className="absolute left-1/2 bottom-[-16px] md:bottom-[-32px] w-[95px] h-[30px] md:w-[200px] md:h-[64px]"
				initial={false}
				animate={{
					translateY: "100%",
					translateX: "-50%",
					scale: isActive ? 1 : 0.5,
					opacity: isActive ? 1 : 0,
				}}
			>
				<a
					href="https://f.crossbell.io/pass"
					target="_blank"
					onClick={(e) => e.stopPropagation()}
				>
					<Image src={addToAppleWalletImg} alt="Add to Apple Wallet" fill />
				</a>
			</m.div>
		</div>
	);
}
