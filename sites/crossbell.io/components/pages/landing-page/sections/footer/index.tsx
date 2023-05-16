import Link from "next/link";
import Image from "next/image";
import { CrossbellLogo } from "@crossbell/ui";

import {
	linksGroup,
	socialMedias,
} from "@/components/pages/products/components/Footer";

import bgCircle from "./bg-circle.svg";
import { useMediaQuery } from "@mantine/hooks";
import { breakpoints } from "~/scripts/unocss/breakpoints";
import { AutoShow } from "@/components/pages/landing-page/components/auto-show";

export function FooterSection({
	onScrollToTop,
}: {
	onScrollToTop: () => void;
}) {
	const isMD = useMediaQuery(`(min-width: ${breakpoints.md}px)`);

	return (
		<div className="flex flex-col items-start px-[48px] mt-[121px] relative -z-10 max-w-[1920px] mx-auto">
			{!isMD && (
				<CrossbellLogo className="w-[125px] h-[34px] text-[#fff] self-center" />
			)}

			<div className="absolute left-1/2 -translate-x-1/2 w-[210vw] md:w-[115vw] max-w-[2112px] translate-y-[-10%] md:translate-y-0 top-0 md:top-[-33vw] -z-10 pointer-events-none">
				<div className="aspect-square relative">
					<Image
						src={bgCircle}
						alt="Background"
						className="w-full animate-spin animate-duration-[40s]"
						fill
					/>
				</div>
			</div>

			<div className="mt-[48px] md:w-full md:max-w-[888px] md:mx-auto">
				<div className="flex flex-col gap-[32px] md:flex-row md:justify-between">
					{linksGroup.map((lg) => (
						<AutoShow key={lg.title}>
							<h4 className="text-[22px] font-extrabold mt-0 mb-[4px]">
								{lg.title}
							</h4>

							<ul className="p-0 m-0 flex flex-col gap-[4px] list-none">
								{lg.list.map((l) => (
									<li
										className="text-[16px] leading-[24px] opacity-80 flex hover:underline"
										key={l.text}
									>
										<Link href={l.href} target="_blank">
											{l.text}
										</Link>
									</li>
								))}
							</ul>
						</AutoShow>
					))}
				</div>
			</div>

			<AutoShow className="flex items-center md:justify-between w-full max-w-[1248px] mx-auto md:mt-[122px] md:mb-[-30px]">
				{isMD && (
					<CrossbellLogo className="w-[125px] h-[34px] text-[#fff] self-center" />
				)}

				<div className="mt-[24px] mb-[37px] md:my-0">
					<div className="flex justify-center gap-[32px]">
						{socialMedias.map((sm) => (
							<Link key={sm.text} href={sm.link} target="_blank">
								<span
									className={`${sm.icon} block w-[24px] h-[24px] opacity-80 hover:opacity-100`}
								/>
							</Link>
						))}
					</div>
				</div>
			</AutoShow>

			<AutoShow className="mx-auto flex flex-col items-center">
				<button
					className="border-none bg-transparent text-[#fff] text-[12px] leading-[28px] font-bold cursor-pointer"
					onClick={onScrollToTop}
				>
					PAGE TOP
				</button>
				<div className="w-[1px] h-[80px] bg-[#fff]" />
			</AutoShow>
		</div>
	);
}
