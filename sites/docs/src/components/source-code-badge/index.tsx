import React from "react";

export type SourceCodeBadgeProps = {
	url: string;
};

export function SourceCodeBadge({ url }: SourceCodeBadgeProps) {
	return (
		<a
			href={url}
			target="_blank"
			className="text-xs underline font-mono opacity-50 hover:opacity-100"
		>
			[Source Code]
		</a>
	);
}
