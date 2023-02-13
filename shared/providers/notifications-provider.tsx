import React, { PropsWithChildren } from "react";
import { Notifications } from "@mantine/notifications";

export function NotificationsProvider({ children }: PropsWithChildren) {
	return (
		<>
			{children}
			<Notifications position="bottom-center" zIndex={99999} />
		</>
	);
}
