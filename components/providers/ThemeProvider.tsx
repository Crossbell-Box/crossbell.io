import {
	MantineProvider,
	createEmotionCache,
	Tuple,
	DefaultMantineColor,
} from "@mantine/core";
import { PropsWithChildren } from "react";

export const emotionCache = createEmotionCache({
	key: "mantine",
	prepend: true, // https://github.com/mantinedev/mantine/issues/823#issuecomment-1065833889
});

export default function ThemeProvider({ children }: PropsWithChildren) {
	return (
		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			emotionCache={emotionCache}
			theme={{
				/** Put your mantine theme override here */
				colorScheme: "light",
				fontFamily: "Roboto",
				fontFamilyMonospace: "Monaco, Courier, monospace",
				headings: { fontFamily: "Lexend Deca" },
				white: "#fff",
				black: "#0f1419", // "#082135",
				colors: {
					brand: [
						"#FFF9E9",
						"#FFF0CA",
						"#FFE9B0",
						"#FFE093",
						"#FFD773",
						"#FFCF55", // <-
						"#E2B542",
						"#C09526",
						"#A67E18",
						"#7C5D0C",
					],
					blue: [
						"#FBFCFF",
						"#5B89F7",
						"#5B89F7",
						"#5B89F7",
						"#5B89F7",
						"#5B89F7", // <-
						"#5B89F7",
						"#5B89F7",
						"#5B89F7",
						"#5B89F7",
					],
					red: [
						"#FFFBFB",
						"#FFEDEA",
						"#FFDAD5",
						"#FFB4A9",
						"#FF8A7A",
						"#E65040", // <-
						"#D54435",
						"#B22B20",
						"#900F0A",
						"#690001",
					],
					yellow: [
						"#F6C549",
						"#F6C549",
						"#F6C549",
						"#F6C549",
						"#F6C549",
						"#F6C549", // <-
						"#F6C549",
						"#F6C549",
						"#F6C549",
						"#F6C549",
					],
					green: [
						"#F5FFF3",
						"#C3FFD0",
						"#8AF9AE",
						"#6AD991",
						"#50C07B",
						"#6AD991", // <-
						"#6AD991",
						"#6AD991",
						"#6AD991",
						"#6AD991",
					],
					purple: [
						"#FFFBFF",
						"#F4EEFF",
						"#E5DEFF",
						"#C8BFFF",
						"#AC9FFF",
						"#9688F2", // <-
						"#7668D0",
						"#5D4FB5",
						"#45359B",
						"#2E1A84",
					],
				},
				primaryColor: "brand",
				primaryShade: 5,
			}}
		>
			{children}
		</MantineProvider>
	);
}

export function usePrimaryShade() {
	return 5;
}

type ExtendedCustomColors = "brand" | "purple" | DefaultMantineColor;

declare module "@mantine/core" {
	export interface MantineThemeColorsOverride {
		colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
	}
}
