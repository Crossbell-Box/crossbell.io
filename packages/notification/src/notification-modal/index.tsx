import React from "react";
import {
	Modal,
	CloseButton,
	ScrollArea,
	Loader,
	Indicator,
} from "@mantine/core";
import { useRefCallback } from "@crossbell/util-hooks";

import { LoadMore } from "~/shared/components/load-more";

import { useModalState, useReadingState, useNotifications } from "../hooks";

import styles from "./index.module.css";
import { Bell } from "./components/bell";
import { Item } from "./components/item";

export { useNotifications };

export function useShowNotificationModal() {
	return useModalState((s) => s.showModal);
}

export function NotificationModal() {
	const {
		notifications,
		total,
		isAllRead,
		isLoading,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useNotifications();

	const { isModalActive, hideModal: hideModal_ } = useModalState();
	const { isRead, markRead } = useReadingState();

	const hideModal = useRefCallback(() => {
		hideModal_();
		markRead(notifications);
	});

	return (
		<Modal
			withCloseButton={false}
			radius={28}
			padding={24}
			onClose={hideModal}
			opened={isModalActive}
			classNames={{ modal: styles.modal }}
		>
			<div className={styles.header}>
				<Indicator size={9} disabled={isAllRead} color="red" offset={4.5}>
					<Bell className={styles.headerBell} />
				</Indicator>
				<span className={styles.headerTitle}>Notifications</span>
				<CloseButton size={28} onClick={hideModal} />
			</div>

			<ScrollArea.Autosize maxHeight="80vh">
				{isLoading ? (
					<div className={styles.loader}>
						<Loader />
					</div>
				) : total > 0 ? (
					<>
						{notifications.map((notification) => (
							<Item
								notification={notification}
								isRead={isRead(notification)}
								key={notification.transactionHash}
							/>
						))}

						<LoadMore
							onLoadMore={() => fetchNextPage()}
							hasNextPage={Boolean(hasNextPage)}
							isLoading={isFetchingNextPage}
						>
							Loading...
						</LoadMore>
					</>
				) : (
					<div className={styles.noNotificationTips}>No notification yet</div>
				)}
			</ScrollArea.Autosize>
		</Modal>
	);
}
