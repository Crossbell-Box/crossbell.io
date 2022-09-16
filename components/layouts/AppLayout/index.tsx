import React, { type PropsWithChildren, ReactElement } from "react";
import { AppShell, Center } from "@mantine/core";
import Nav from "./Nav";
import Aside from "./Aside";
import { useElementSize } from "@mantine/hooks";
import ScrollToTop from "@/components/common/ScrollToTopButton";
import { MigrationNotification } from "@/components/biz/migrate";

export default function AppLayout({ children }: PropsWithChildren) {
	const { ref: rootRef, width: rootWidth } = useElementSize();
	const { ref: navRef, width: navWidth } = useElementSize();
	const { ref: asideRef, width: asideWidth } = useElementSize();
	const mainWidth = rootWidth - navWidth - asideWidth;

	return (
		<Center>
			<ScrollToTop />

			<MigrationNotification />

			<AppShell
				ref={rootRef}
				styles={{
					root: { maxWidth: "min(100vw, 1400px)" },
					main: { padding: 0, width: mainWidth },
				}}
				classNames={{
					root: "w-full",
					body: "main-content",
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
	);
}

export const getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;
