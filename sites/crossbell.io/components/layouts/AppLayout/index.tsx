import { AppShell, Center } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import React, { type PropsWithChildren, type ReactElement } from "react";

import ScrollToTop from "@/components/common/ScrollToTopButton";
import { MigrationNotification } from "@/components/biz/migrate";

import Nav from "./Nav";
import Aside from "./Aside";

type AppLayoutProps = PropsWithChildren & {
	rootRef: React.RefObject<HTMLDivElement>;
	navRef: React.RefObject<HTMLDivElement>;
	asideRef: React.RefObject<HTMLDivElement>;
	mainWidth: number;
};

const AppLayout = withCachedMainWidth(
	({ children, navRef, asideRef, rootRef, mainWidth }: AppLayoutProps) => (
		<Center>
			<ScrollToTop />

			<MigrationNotification />

			<AppShell
				ref={rootRef}
				styles={{
					root: { maxWidth: "min(100vw, 1440px)" },
					main: { padding: 0, width: mainWidth },
				}}
				classNames={{
					root: "w-full",
					body: "main-content z-0 relative",
				}}
				navbarOffsetBreakpoint="sm"
				asideOffsetBreakpoint="sm"
				fixed={false}
				navbar={
					<div ref={navRef}>
						<Nav />
					</div>
				}
				aside={
					<div ref={asideRef}>
						<Aside />
					</div>
				}
			>
				<div className="relative">{children}</div>
			</AppShell>
		</Center>
	)
);

export const getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

function withCachedMainWidth(Component: React.ComponentType<AppLayoutProps>) {
	const MemoComponent = React.memo(Component);

	return function CachedMainWidth(props: PropsWithChildren) {
		const { ref: rootRef, width: rootWidth } = useElementSize();
		const { ref: navRef, width: navWidth } = useElementSize();
		const { ref: asideRef, width: asideWidth } = useElementSize();
		const mainWidth = rootWidth - navWidth - asideWidth;

		return (
			<MemoComponent
				rootRef={rootRef}
				navRef={navRef}
				asideRef={asideRef}
				mainWidth={mainWidth}
				{...props}
			/>
		);
	};
}
