import { Button, Title } from "@mantine/core";
import { NextLink } from "@mantine/next";
import TypeIt from "typeit-react";

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
			<img
				src="/logos/twitter.png"
				alt="Twitter Icon"
				className="absolute left-0 top-0"
				style={{
					width: "413.65px",
					height: "413.65px",
					left: "80px",
					top: "126px",
					transform: "rotate(15deg)",
				}}
			/>
			<img
				src="/logos/instagram.png"
				alt="Instagram Icon"
				className="absolute right-0 top-0"
				style={{
					width: "211.2px",
					height: "211.2px",
					right: "180px",
					top: "165px",
					transform: "matrix(-0.97, 0.26, 0.26, 0.97, 0, 0)",
				}}
			/>
			<img
				src="/logos/youtube.png"
				alt="Youtube Icon"
				className="absolute left-0 bottom-0"
				style={{
					width: "158.32px",
					height: "158.32px",
					left: "180px",
					bottom: "118px",
					transform: "rotate(-30deg)",
				}}
			/>
			<img
				src="/logos/tiktok.png"
				alt="Tiktok Icon"
				className="absolute right-0 bottom-0"
				style={{
					width: "226.47px",
					height: "226.47px",
					right: "120px",
					bottom: "116px",
					transform: "matrix(-0.93, -0.36, -0.36, 0.93, 0, 0)",
				}}
			/>
		</div>
	);
}

function HeroTexts() {
	return (
		<div className="text-center relative flex flex-col justify-center">
			<Title
				order={2}
				className="font-bold text-size-[3rem] md:text-size-[4rem] xl:text-size-[6rem]"
			>
				<Typer />
			</Title>

			<span className="text-lg text-[#082135] block my-12">
				Crossbell is a platform for owning your social activities, <br />
				composed of an EVM-compatible blockchain and a set of smart contracts.
			</span>

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
			getBeforeInit={(instance) => {
				instance
					.type(
						"Own Your <strong class='text-brand-primary'>Social Activities!</strong>"
					)
					.pause(2000);

				const altTexts = [
					"Profiles",
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
