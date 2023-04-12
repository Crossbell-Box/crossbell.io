import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { ParsedNotification } from "@crossbell/indexer";

export type ReadingState = {
	cache: Record<ParsedNotification["transactionHash"], boolean | undefined>;
	isRead: (notification: ParsedNotification) => boolean;
	markRead: (notifications: ParsedNotification[]) => void;
};

export const useReadingState = create(
	persist(
		immer<ReadingState>((set, get) => ({
			cache: {},

			isRead(notification) {
				return (
					notification.isReadBefore ||
					!!get().cache[notification.transactionHash]
				);
			},

			markRead(notifications) {
				set(({ cache }) => {
					notifications.forEach(({ transactionHash }) => {
						cache[transactionHash] = true;
					});
				});
			},
		})),
		{ name: "@crossbell/notification/reading-status" }
	)
);
