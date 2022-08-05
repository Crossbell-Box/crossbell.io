import React, { type PropsWithChildren, ReactElement } from "react";
import { AppShell, Center } from "@mantine/core";
import Nav from "./Nav";
import Aside from "./Aside";

export default function AppLayout({ children }: PropsWithChildren) {
	return (
		<Center>
			<AppShell
				styles={{
					root: { maxWidth: "min(100vw, 1200px)" },
					main: { padding: 0 },
				}}
				className={"w-full"}
				navbarOffsetBreakpoint="sm"
				asideOffsetBreakpoint="sm"
				fixed={false}
				navbar={<Nav />}
				aside={<Aside />}
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
