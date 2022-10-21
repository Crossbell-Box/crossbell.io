import { Space, Text } from "@mantine/core";
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
				{ text: "Status", href: "https://status.crossbell.io/" },
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
		link: "https://t.me/+RBF2McON3z81YzFh",
	},
	{
		text: "GitHub",
		icon: "i-csb:github",
		link: "https://github.com/Crossbell-Box",
	},
];

export default function IndexFooter() {
	return (
		<div className="w-full py-10 px-5 md:px-10 lg:px-20 flex flex-col items-start">
			{/* middle - links */}
			<div className="w-fit md:w-full">
				<div className="flex flex-col justify-center items-start md:flex-row md:justify-between md:items-start">
					{linksGroup.map((lg) => (
						<div key={lg.title}>
							<Text
								color="dark.9"
								className="font-800 text-xl sm:text-4xl sm:my-10"
							>
								{lg.title}
							</Text>

							<div>
								{lg.list.map((l) => (
									<div className="my-1 sm:my-2" key={l.text}>
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

			{/* bottom - social medias */}
			<div className="w-full flex items-center justify-end sm:mt-25">
				{/* social medias */}
				<div className="flex space-x-10px">
					{socialMedias.map((sm) => (
						<Text
							key={sm.text}
							className="my-2 p-2 bg-hover rounded-md cursor-pointer text-2xl sm:text-3xl"
							component={NextLink}
							href={sm.link}
							target="_blank"
							rel="noopener noreferrer"
						>
							<Text className={sm.icon} color="dark.9" />
						</Text>
					))}
				</div>
			</div>
		</div>
	);
}
