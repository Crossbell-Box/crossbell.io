import { DocsThemeConfig } from "nextra-theme-docs";
import { CrossbellLogo } from "@crossbell/ui";
import { useRouter } from "next/router";

const config: DocsThemeConfig = {
	logo: (
		<span className="flex items-center gap-2">
			<CrossbellLogo />
			<span className="text-xs font-black -translate-y-1/2">DEV</span>
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
