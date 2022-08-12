import React, { type PropsWithChildren, ReactElement } from "react";
import { AppShell, Center } from "@mantine/core";
import Nav from "./Nav";
import Aside from "./Aside";
import { useElementSize } from "@mantine/hooks";
import ScrollToTop from "@/components/common/ScrollToTopButton";

export default function AppLayout({ children }: PropsWithChildren) {
	const { ref: rootRef, width: rootWidth } = useElementSize();
	const { ref: navRef, width: navWidth } = useElementSize();
	const { ref: asideRef, width: asideWidth } = useElementSize();
	const mainWidth = rootWidth - navWidth - asideWidth;

	return (
		<Center>
			<ScrollToTop />
			<AppShell
				ref={rootRef}
				styles={{
					root: { maxWidth: "min(100vw, 1200px)" },
					main: { padding: 0, width: mainWidth },
				}}
				className={"w-full"}
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
				// footer={
				//   <Footer height={60} p="md">
				//     Application footer
				//   </Footer>
				// }
				// header={
				//   <Header height={70} p="md">
				//     <div
				//       style={{ display: "flex", alignItems: "center", height: "100%" }}
				//     >
				//       <MediaQuery largerThan="sm" styles={{ display: "none" }}>
				//         <Burger
				//           opened={opened}
				//           onClick={() => setOpened((o) => !o)}
				//           size="sm"
				//           color={theme.colors.gray[6]}
				//           mr="xl"
				//         />
				//       </MediaQuery>

				//       <Text>Application header</Text>
				//     </div>
				//   </Header>
				// }
			>
				<div className="relative">{children}</div>
			</AppShell>
		</Center>
	);
}

export const getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;
