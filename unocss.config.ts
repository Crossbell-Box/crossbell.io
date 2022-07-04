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
	shortcuts: {
		"bg-hover":
			"hover:bg-gray/15 active:bg-gray/20 transition-background-color",
	},
	theme: {
		colors: {
			brand: {
				primary: "#FFCF55",
			},
		},
	},
});
