import { Button, Title, Text, Space } from "@mantine/core";
import { NextLink } from "@mantine/next";
// @ts-ignore
import TypeIt from "typeit-react";

import VideoPlayer from "@/components/common/Note/VideoPlayer";
import Image from "@/components/common/Image";

export default function IndexHero() {
	return (
		<div className="relative h-100vh flex flex-col justify-center">
			<BGImage />
			<SNSIcons />
			<HeroTexts />
			<i className="i-csb:dropdown flex self-center absolute bottom-0 w-14 h-8" />
		</div>
	);
}

function SNSIcons() {
	return (
		<div className="absolute w-full h-full overflow-hidden hidden md:block">
			<div
				className="absolute left-80px top-126px"
				style={{ transform: "rotate(15deg)" }}
			>
				<Image
					src="/images/logos-3d/twitter.png"
					alt="Twitter Icon"
					placeholder="empty"
					width={414}
					height={414}
					quality={90}
				/>
			</div>
			<div
				className="absolute right-180px top-165px"
				style={{ transform: "matrix(-0.97, 0.26, 0.26, 0.97, 0, 0)" }}
			>
				<Image
					src="/images/logos-3d/instagram.png"
					alt="Instagram Icon"
					placeholder="empty"
					width={211}
					height={211}
					quality={90}
				/>
			</div>
			<div
				className="absolute left-180px bottom-118px"
				style={{ transform: "rotate(-30deg)" }}
			>
				<Image
					src="/images/logos-3d/youtube.png"
					alt="Youtube Icon"
					placeholder="empty"
					width={158}
					height={158}
					quality={90}
				/>
			</div>
			<div
				className="absolute left-368px bottom-60px"
				style={{ transform: "rotate(-36deg)" }}
			>
				<Image
					src="/images/logos-3d/pinterest.png"
					alt="Pinterest Icon"
					placeholder="empty"
					width={113}
					height={113}
					quality={90}
				/>
			</div>
			<div
				className="absolute right-120px bottom-116px"
				style={{ transform: "matrix(-0.93, -0.36, -0.36, 0.93, 0, 0)" }}
			>
				<Image
					src="/images/logos-3d/tiktok.png"
					alt="Tiktok Icon"
					placeholder="empty"
					width={226}
					height={226}
					quality={90}
				/>
			</div>
		</div>
	);
}

function HeroTexts() {
	return (
		<div className="text-center relative flex flex-col justify-center items-center">
			<Space h={50} />

			<Title
				order={2}
				className="font-bold text-size-[2rem] md:text-size-[4rem] xl:text-size-[6rem]"
			>
				<Typer />
			</Title>

			<Space h={20} />

			<div className="max-w-100vw">
				<VideoPlayer
					className="max-w-100vw"
					style={{ maxWidth: "80vw", maxHeight: "40vh" }}
					url="https://www.youtube.com/watch?v=Txq26_SI6XE"
					config={{
						youtube: {
							playerVars: {
								modestbranding: 1,
							},
						},
					}}
				/>
			</div>

			<Space h={20} />

			<Text className="text-lg text-[#082135]">
				Crossbell is a platform for owning your social activities, <br />
				composed of an EVM-compatible blockchain and a set of smart contracts.
			</Text>

			<Space h={20} />

			<span>
				<Button color="#FFDA48" size="xl" component={NextLink} href="/explore">
					<span className="text-lg text-black font-lg mx-11">Explore</span>
				</Button>
			</span>
		</div>
	);
}

function BGImage() {
	return (
		<div
			className="absolute w-full h-full opacity-15"
			style={{
				backgroundImage: 'url("/images/body-bg.png")',
				backgroundSize: "1000px 2048px",
				filter: "blur(169px)",
				transform: "rotate(90deg)",
			}}
		/>
	);
}

function Typer() {
	return (
		<TypeIt
			options={{ loop: true }}
			getBeforeInit={(instance: any) => {
				instance
					.type(
						"Own Your <strong class='text-brand-primary'>Social Activities!</strong>"
					)
					.pause(2000);

				const altTexts = [
					"Characters",
					"Follow Lists",
					"Notes",
					"Articles",
					"Likes",
					"Comments",
					"Collections",
				];

				altTexts.forEach((t) => {
					instance
						.delete(".text-brand-primary")
						.type(`<strong class='text-brand-primary'>${t}!</strong>`)
						.pause(1500);
				});

				return instance;
			}}
		/>
	);
}
