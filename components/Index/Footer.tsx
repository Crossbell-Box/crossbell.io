import { Divider, Group, Space, Text } from "@mantine/core";
import Image from "../common/Image";
import FollowBtn from "@/public/images/pages/index/follow-btn.svg";
import Logo from "../common/Logo";
import Link from "next/link";
import { composeCharacterHref } from "@/utils/url";
import { NextLink } from "@mantine/next";

const linksGroup: { title: string; list: { text: string; href: string }[] }[] =
	[
		{
			title: "Eco Apps",
			list: [
				{ text: "Crosssync", href: "https://crosssync.app/" },
				{ text: "Unidata", href: "https://unidata.app/" },
				{ text: "xlog", href: "https://xlog.app/" },
			],
		},
		{
			title: "Resources",
			list: [
				{ text: "Indexer", href: "https://index.crossbell.io/docs" },
				{
					text: "Wiki",
					href: "https://github.com/Crossbell-Box/Crossbell-Contracts/wiki",
				},
				{ text: "Blog", href: "https://crossbell-blog.xlog.app/" },
				{ text: "Scan", href: "https://scan.crossbell.io/" },
			],
		},
		{
			title: "Communities",
			list: [
				{
					text: "Developer Discussion",
					href: "https://github.com/orgs/Crossbell-Box/discussions",
				},
				{
					text: "Twitter",
					href: "https://twitter.com/_Crossbell",
				},
				{ text: "Discord", href: "https://discord.gg/4GCwDsruyj" },
				{
					text: "Careers",
					href: "https://www.notion.so/rss3/Open-Source-Remote-RSS3-s-Parent-Company-Natural-Selecti[…]Offering-the-Dopest-Positions-b6fdbffee017449797397f45340de9d4",
				},
			],
		},
	];

const socialMedias: {
	text: string;
	icon: string;
	link: string;
}[] = [
	{
		text: "Discord",
		icon: "i-csb:discord",
		link: "https://discord.gg/4GCwDsruyj",
	},
	{
		text: "Twitter",
		icon: "i-csb:twitter",
		link: "https://twitter.com/_Crossbell",
	},
	{
		text: "YouTube",
		icon: "i-csb:youtube",
		link: "https://youtube.com/channel/UCs_f32UpeFk2CM8hzF7Q61Q",
	},
	{
		text: "Telegram",
		icon: "i-csb:telegram",
		link: "",
	},
	{
		text: "GitHub",
		icon: "i-csb:github",
		link: "https://github.com/Crossbell-Box",
	},
];

function IndexFooter() {
	return (
		<div className="w-full bg-[#14181B] py-10 px-5 md:px-10 lg:px-20 flex flex-col items-center md:items-start">
			{/* top - logo & follow */}
			<div className="flex flex-col justify-center items-center md:flex-row md:justify-between w-full">
				{/* left - follow description */}
				<Group>
					<Logo size={80} />
					<div>
						<Text color="gray.0" className="font-800 text-4xl">
							Follow
						</Text>
						<Text color="dimmed">
							Follow our Crossbell character
							<br /> to get the latest news
						</Text>
					</div>
				</Group>

				{/* right - follow button */}
				<Link href={composeCharacterHref("crossbell")}>
					<div>
						<Image
							src={FollowBtn}
							className="cursor-pointer"
							alt="Follow @crossbell"
						/>
					</div>
				</Link>
			</div>

			<Space h={50} />

			{/* middle - links */}
			<div className="w-fit md:w-full">
				<div className="flex flex-col justify-center items-start md:flex-row md:justify-between md:items-start">
					{linksGroup.map((lg) => (
						<div key={lg.title}>
							<Text color="gray.0" className="font-800 text-4xl">
								{lg.title}
							</Text>

							<Space h={10} />

							<div>
								{lg.list.map((l) => (
									<div className="my-2" key={l.text}>
										<Text
											variant="link"
											component={NextLink}
											href={l.href}
											color="dimmed"
											target="_blank"
											rel="noopener noreferrer"
										>
											{l.text}
										</Text>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>

			<Space h={25} />

			<div className="w-full">
				<Divider color="gray.7" orientation="horizontal" size="xs" />
			</div>

			<Space h={25} />

			{/* bottom - social medias */}
			<div className="w-full flex items-center justify-between">
				{/* logo */}
				<div className="flex items-center">
					<Logo />
					<Space w={10} />
					<Text color="gray.0" className="font-400 text-2xl">
						Crossbell
					</Text>
				</div>

				{/* social medias */}
				<div className="flex">
					{socialMedias.map((sm) => (
						<Text
							key={sm.text}
							className="my-2 p-2 bg-hover rounded-md cursor-pointer text-xl"
							component={NextLink}
							href={sm.link}
							target="_blank"
							rel="noopener noreferrer"
						>
							<Text className={sm.icon} color="gray.0" />
						</Text>
					))}
				</div>
			</div>
		</div>
	);
}

export default IndexFooter;
