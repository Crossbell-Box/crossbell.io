import React, { PropsWithChildren } from "react";
import { ModalsProvider as MantineModalsProvider } from "@mantine/modals";

export default function ModalsProvider({ children }: PropsWithChildren) {
	return (
		<MantineModalsProvider
			modalProps={{
				centered: true,
				styles: {
					title: { fontWeight: "bold" },
				},
				withCloseButton: false,
			}}
		>
			{children}
		</MantineModalsProvider>
	);
}
