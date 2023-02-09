import { Text } from "@mantine/core";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import { useElementSize, useWindowScroll } from "@mantine/hooks";
import { ArrowBackIcon } from "@crossbell/ui";

let _height = 72;

export function useHeaderSize() {
	const [height, setHeight] = useState(_height);

	useEffect(() => {
		setHeight(_height);
	}, [_height]);

	return { height };
}

export default function Header({
	children,
	hasBackButton = false,
	renderBottom,
}: PropsWithChildren<{
	hasBackButton?: boolean;
	renderBottom?: () => React.ReactNode;
}>) {
	const { ref, height: h } = useElementSize();

	_height = h;

	const router = useRouter();

	const handleCLickBack = () => {
		if (history.length === 1) {
			router.push("/feed");
		} else {
			// TODO: this would be a bug if the previous page was not the app
			router.back();
		}
	};

	const [scroll] = useWindowScroll();
	const scrolled = scroll.y > 0;

	return (
		<>
			<div
				className="absolute top-0 left-0 right-0 z-0 h-100px"
				style={{
					background:
						"linear-gradient(to bottom, rgba(255,255,255,0) 40%, rgba(255,255,255,1)), url(/images/header-texture.svg)",
				}}
			/>

			<header
				ref={ref}
				className={classNames(
					"sticky top-0 my-0 z-100 flex items-center relative transition-all duration-200 min-h-50px px-3",
					{
						"bg-white/96 backdrop-blur": scrolled,
					}
				)}
			>
				{hasBackButton && (
					<button
						className="flex items-center justify-center mr-8px p-0 border-none bg-transparent ux-overlay rounded-md"
						onClick={handleCLickBack}
					>
						<ArrowBackIcon className="text-size-3xl text-[#999]" />
					</button>
				)}

				{typeof children === "string" ? (
					<Text className="py-3 font-semibold leading-1em text-size-2xl sm:text-size-3xl md:text-size-4xl overflow-hidden text-ellipsis">
						{children}
					</Text>
				) : (
					children
				)}
			</header>

			{renderBottom && renderBottom()}
		</>
	);
}
