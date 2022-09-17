import React, { type PropsWithChildren, ReactElement } from "react";
import { AppShell, Center } from "@mantine/core";
import Nav from "./Nav";
import Aside from "./Aside";
import ScrollToTop from "@/components/common/ScrollToTopButton";
import { MigrationNotification } from "@/components/biz/migrate";

export default function AppLayout({ children }: PropsWithChildren) {
	return (
		<Center>
			<ScrollToTop />

			<MigrationNotification />

			<AppShell
				styles={{
					root: { maxWidth: "min(100vw, 1400px)" },
					main: { padding: 0, overflow: "hidden" },
				}}
				classNames={{
					root: "w-full",
					body: "main-content",
				}}
				navbarOffsetBreakpoint="sm"
				asideOffsetBreakpoint="sm"
				fixed={false}
				navbar={
					<div>
						<Nav />
					</div>
				}
				aside={
					<div>
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
