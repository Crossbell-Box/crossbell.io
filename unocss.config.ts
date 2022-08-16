import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetUno,
} from "unocss";
import { FileSystemIconLoader } from "@iconify/utils/lib/loader/node-loaders";

export default defineConfig({
	presets: [
		presetAttributify(),
		presetIcons({
			collections: {
				csb: FileSystemIconLoader("./icons", (svg) => svg),
				// Usage example: <Text className="i-csb:back" />
			},
		}),
		presetUno(),
	],
	rules: [
		["font-roboto", { "font-family": "Roboto" }],
		["font-deca", { "font-family": "Lexend Deca" }],
	],
	shortcuts: {
		"bg-hover": "hover:bg-gray/5 active:bg-gray/10 transition-background-color",
	},
	theme: {
		colors: {
			brand: {
				primary: "#FFCF55", // bg-brand-primary
			},
			dimmed: "#868e96",
			red: {
				light: "#E7AAA1",
				primary: "#E65040",
			},
			yellow: {
				light: "#FAE3A6",
				primary: "#FFC53D",
			},
			blue: {
				light: "#B1C3F7",
				primary: "#5B89F7",
			},
			green: {
				light: "#C0EACB",
				primary: "#6AD991",
			},
			purple: {
				light: "#C8C3F4",
				primary: "#9688F2",
			},
		},
	},
});
