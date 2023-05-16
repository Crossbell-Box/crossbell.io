import React from "react";
import { Scroll } from "scrollex";

import Loading from "../products/components/Loading";
import { Header } from "./components/header";
import { IntroSection } from "./sections/intro";
import { CrossbellScanSection } from "./sections/crossbell-scan";
import { ConnectSection } from "./sections/connect";
import { SocialGraphSection } from "./sections/social-graph";
import { ModularitySection } from "./sections/modularity";
import { WhatIsCrossbellSection } from "./sections/what-is-crossbell";
import { WhyCrossbellSection } from "./sections/why-crossbell";
import { CommunitySupportSection } from "./sections/community-support";
import { FooterSection } from "./sections/footer";
import { MonetizationSection } from "./sections/monetization";
import { OperatorSignSection } from "./sections/operator-sign";
import { useMediaQuery } from "@mantine/hooks";
import { breakpoints } from "~/scripts/unocss/breakpoints";

import styles from "./index.module.css";

export function LandingPage() {
	const isMD = useMediaQuery(`(min-width: ${breakpoints.md}px)`);
	const isSM = useMediaQuery(`(min-width: ${breakpoints.sm}px)`);
	const containerRef = React.useRef<HTMLDivElement>(null);
	const socialGraphSectionRef = React.useRef<HTMLDivElement>(null);

	return (
		<div className="bg-[#0D0E0F] text-[#fff]">
			<Loading />

			<Scroll.Container
				key={isMD ? "md" : isSM ? "sm" : "xs"}
				className={`relative z-0 h-[100vh] ${styles.container}`}
				ref={containerRef}
			>
				<Header />

				<Scroll.Section className="max-w-[1920px] mx-auto">
					<IntroSection
						onClickNext={() => {
							scrollToY(containerRef.current, {
								targetY: window.innerHeight / 0.9,
							});
						}}
					/>
				</Scroll.Section>

				<Scroll.Section className="max-w-[1920px] mx-auto">
					<CrossbellScanSection />
				</Scroll.Section>

				<Scroll.Section className="max-w-[1920px] mx-auto">
					<ConnectSection
						onClickScrollDown={() => {
							const offsetTop = socialGraphSectionRef.current?.offsetTop ?? 0;

							scrollToY(containerRef.current, {
								targetY: offsetTop + window.innerHeight / 5,
							});
						}}
					/>
				</Scroll.Section>

				<Scroll.Section
					ref={socialGraphSectionRef}
					className="max-w-[1920px] mx-auto"
				>
					<SocialGraphSection />
				</Scroll.Section>

				<Scroll.Section className="max-w-[1920px] mx-auto">
					<ModularitySection />
				</Scroll.Section>

				<Scroll.Section>
					<MonetizationSection />
				</Scroll.Section>

				<Scroll.Section className="max-w-[1920px] mx-auto">
					<OperatorSignSection />
				</Scroll.Section>

				<Scroll.Section className="max-w-[1920px] mx-auto">
					<WhatIsCrossbellSection />
				</Scroll.Section>

				<Scroll.Section className="max-w-[1920px] mx-auto">
					<WhyCrossbellSection />
				</Scroll.Section>

				<Scroll.Section className="max-w-[1920px] mx-auto">
					<CommunitySupportSection />
				</Scroll.Section>

				<FooterSection
					onScrollToTop={() => {
						scrollToY(containerRef.current, { targetY: 0 });
					}}
				/>
			</Scroll.Container>
		</div>
	);
}

interface ScrollOptions {
	targetY: number;
	duration?: number;
	easing?: (t: number) => number;
}

function scrollToY(element: HTMLElement | null, options: ScrollOptions): void {
	if (!element) return;

	const { targetY, duration = 0 } = options;
	const easing =
		options.easing ||
		((t: number) =>
			t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1);
	const startY = element.scrollTop;
	const deltaY = targetY - startY;
	const startTime = performance.now();

	const animation = (timestamp: number): void => {
		const elapsed = timestamp - startTime;
		const progress = Math.min(elapsed / duration, 1);
		const easedProgress = easing(progress);

		element.scrollTop = startY + deltaY * easedProgress;

		if (progress < 1) {
			window.requestAnimationFrame(animation);
		}
	};

	window.requestAnimationFrame(animation);
}
