import React from "react";
import Image, { ImageProps } from "next/image";

export function BgImg({ className, ...props }: ImageProps) {
	return (
		<div
			className={`absolute -z-1 pointer-events-none opacity-50 ${className}`}
		>
			<Image {...props} />
		</div>
	);
}
