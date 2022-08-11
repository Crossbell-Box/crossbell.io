import { Badge } from "@mantine/core";
import { CharacterEntity, NoteMetadata } from "crossbell.js";
import { TinyColor, random, mostReadable } from "@ctrl/tinycolor";

const builtInColorMap = {
	xlog: "#6466e9",
	operatorsync: "#5298e9",
	crosssync: "#5d87f7",
	medium: "#000000",
	twitter: "#4691dd",
	tiktok: "#000000",
	youtube: "#ea3323",
} as const;

export default function NoteSources({
	noteMetadata,
}: {
	noteMetadata?: NoteMetadata | null;
}) {
	return (
		<>
			{noteMetadata?.sources?.map((s) => {
				const color = getColorFromSource(s);
				const lighterColor = new TinyColor(color).lighten(10).toHexString();
				const textColor = mostReadable(color, ["#000", "#fff"], {
					includeFallbackColors: true,
					size: "small",
				})?.toHexString();

				return (
					<div className="max-w-10em inline">
						<Badge
							key={s}
							className="mr-2"
							variant="gradient"
							gradient={color ? { from: color, to: lighterColor } : undefined}
							style={{ color: textColor }}
						>
							{s}
						</Badge>
					</div>
				);
			})}
		</>
	);
}

function isBuiltInSource(
	source: string
): source is keyof typeof builtInColorMap {
	return source in builtInColorMap;
}

function getColorFromSource(source: string) {
	const s = source.toLowerCase();
	return isBuiltInSource(s)
		? builtInColorMap[s]
		: random({ seed: stringToInteger(s) }).toHexString();
}

function stringToInteger(string: string) {
	var total = 0;
	for (var i = 0; i !== string.length; i++) {
		if (total >= Number.MAX_SAFE_INTEGER) break;
		total += string.charCodeAt(i);
	}
	return total;
}

//TODO: ...
// function getLinkForSource(source: string, noteMetadata: NoteMetadata, ) {
// 	const s = source.toLowerCase();
// 	if (isBuiltInSource(s)) {
//     if (s === "xlog") {

//       // TODO: ...
// 		}

// 		return undefined;
// 	}

// 	return undefined;
// }
