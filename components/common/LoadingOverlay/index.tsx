import {
	LoadingOverlay as LoadingOverlay_,
	Space,
	useMantineTheme,
	type LoadingOverlayProps,
	Text,
} from "@mantine/core";
import { useScrollLock } from "@mantine/hooks";
import { type PropsWithChildren, useEffect } from "react";

export default function LoadingOverlay({
	description,
	...props
}: PropsWithChildren<
	{
		description?: string;
	} & LoadingOverlayProps
>) {
	const { colors } = useMantineTheme();

	// TODO: a bug with scroll lock

	// const [scrollLocked, setScrollLocked] = useScrollLock();

	// useEffect(() => {
	// 	if (props.visible) {
	// 		setScrollLocked(true);
	// 	}
	// }, [props.visible]);

	const customLoader = (
		<div className="flex flex-col items-center">
			<svg
				width="54"
				height="54"
				viewBox="0 0 38 38"
				xmlns="http://www.w3.org/2000/svg"
				stroke={colors.brand[5]}
			>
				<g fill="none" fillRule="evenodd">
					<g transform="translate(1 1)" strokeWidth="2">
						<circle strokeOpacity=".5" cx="18" cy="18" r="18" />
						<path d="M36 18c0-9.94-8.06-18-18-18">
							<animateTransform
								attributeName="transform"
								type="rotate"
								from="0 18 18"
								to="360 18 18"
								dur="1s"
								repeatCount="indefinite"
							/>
						</path>
					</g>
				</g>
			</svg>

			{description && (
				<>
					<Space h={20} />
					<Text>{description}</Text>
				</>
			)}
		</div>
	);

	return <LoadingOverlay_ loader={customLoader} className="z-402" {...props} />;
}
