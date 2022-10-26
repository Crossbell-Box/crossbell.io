import { Badge } from "@mantine/core";
import { NoteMetadata } from "crossbell.js";
import { TinyColor, random, mostReadable } from "@ctrl/tinycolor";
import { stringToInteger } from "@/utils/helpers";
import Link from "next/link";
import { ReactNode } from "react";

const builtInColorMap = {
	["crossbell.io"]: ["#E1BE60", "#000"],
	xlog: ["#6466e9", "#fff"],
	operatorsync: ["#5298e9", "#fff"],
	sync: ["#5298e9", "#fff"],
	crosssync: ["#5d87f7", "#fff"],
	medium: ["#000000", "#fff"],
	twitter: ["#4691dd", "#fff"],
	tiktok: ["#000000", "#fff"],
	youtube: ["#ea3323", "#fff"],
	pinterest: ["#e60019", "#fff"],
	substack: ["#ff6719", "#fff"],
	pixiv: ["#3e97f3", "#fff"],
	"telegram channel": ["#08c", "#fff"],
} as const;

export default function NoteSources({
	noteMetadata,
}: {
	noteMetadata?: NoteMetadata | null;
}) {
	return (
		<div>
			{noteMetadata?.sources?.map((s) => {
				const [bgColor, textColor] = getColorFromSource(s);
				const lighterBgColor = new TinyColor(bgColor).lighten(10).toHexString();
				const href = getLinkForSource(s, noteMetadata);

				const Wrapper = ({ children }: { children: ReactNode }) =>
					href ? (
						<Link href={href} target="_blank" passHref>
							{children}
						</Link>
					) : (
						<>{children}</>
					);

				return (
					<div
						className="max-w-10em inline mr-2"
						key={s}
						onClick={(e) => e.stopPropagation()}
					>
						<Wrapper>
							<Badge
								className="transition-shadow hover:shadow-sm active:scale-95 transition cursor-pointer"
								variant="gradient"
								gradient={
									bgColor ? { from: bgColor, to: lighterBgColor } : undefined
								}
								style={{ color: textColor }}
								size="sm"
							>
								{s}
							</Badge>
						</Wrapper>
					</div>
				);
			})}
		</div>
	);
}

function isBuiltInSource(
	source: string
): source is keyof typeof builtInColorMap {
	return source in builtInColorMap;
}

function getColorFromSource(source: string) {
	const s = source.toLowerCase();
	if (isBuiltInSource(s)) {
		return builtInColorMap[s];
	}
	const bgColor = random({ seed: stringToInteger(s) }).toHexString();
	const textColor = mostReadable(bgColor, ["#000", "#fff"], {
		includeFallbackColors: true,
		size: "small",
	})?.toHexString();
	return [bgColor, textColor];
}

function getLinkForSource(source: string, noteMetadata: NoteMetadata) {
	const s = source.toLowerCase();

	if (isBuiltInSource(s)) {
		if (["operatorsync", "sync", "xsync"].includes(s)) {
			return "/sync";
		}

		if (s === "xlog") {
			return noteMetadata.external_urls?.[0];
		}

		if (s === "crosssync") {
			return "https://crosssync.app/";
		}

		switch (s) {
			case "twitter":
				return findUrlIncludes(noteMetadata.external_urls, "twitter.com");
			case "medium":
				return findUrlIncludes(noteMetadata.external_urls, "medium.com");
			case "tiktok":
				return findUrlIncludes(noteMetadata.external_urls, "tiktok.com");
			case "substack":
				return findUrlIncludes(noteMetadata.external_urls, "substack.com");
			case "pixiv":
				return findUrlIncludes(noteMetadata.external_urls, "pixiv.com");
			case "telegram channel":
				return findUrlIncludes(noteMetadata.external_urls, "t.me");
			case "pinterest":
				return findUrlIncludes(noteMetadata.external_urls, "pinterest.com");
		}
	}

	return undefined;
}

function findUrlIncludes(urls: string[] | undefined, pattern: string) {
	if (!urls) return undefined;
	const url = urls.find((u) => u.includes(pattern));
	return url ? url : urls[0];
}
