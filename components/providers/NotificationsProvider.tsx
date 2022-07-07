import { PropsWithChildren } from "react";
import { NotificationsProvider as MantineNotificationsProvider } from '@mantine/notifications';

export default function NotificationsProvider({ children }: PropsWithChildren) {
  return (
    <MantineNotificationsProvider position="top-center">
      {children}
    </MantineNotificationsProvider>
  );
}
