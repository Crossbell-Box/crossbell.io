import { DocsThemeConfig } from "nextra-theme-docs";
import { CrossbellLogo } from "@crossbell/ui";
import { useRouter } from "next/router";
import { version } from "../package.json";

const config: DocsThemeConfig = {
	logo: (
		<span className="flex items-center gap-2">
			<CrossbellLogo />
			<div className="flex flex-col text-xs">
				<span className="font-black">DEV</span>
				<span className="opacity-60 font-mono">{version}</span>
			</div>
		</span>
	),
	docsRepositoryBase:
		"https://github.com/Crossbell-Box/crossbell-universe/tree/main/sites/docs",
	project: {
		link: "https://github.com/Crossbell-Box/crossbell-universe",
	},
	useNextSeoProps() {
		const { route } = useRouter();

		return {
			titleTemplate: route !== "/" ? "%s – Crossbell Dev" : "%s",
		};
	},
	footer: {
		text() {
			return (
				<div>
					<p>MIT © 2023 Natural Selection Labs</p>
				</div>
			);
		},
	},
};

export default config;
