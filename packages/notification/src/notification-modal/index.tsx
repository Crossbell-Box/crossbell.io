import React from "react";
import { useRefCallback } from "@crossbell/util-hooks";
import {
	BaseModal,
	LoadMore,
	CloseIcon,
	Indicator,
	Loading,
} from "@crossbell/ui";

import { useModalState, useReadingState, useNotifications } from "../hooks";

import styles from "./index.module.css";
import { Bell } from "./components/bell";
import { Item } from "./components/item";

export { useNotifications };

export function useShowNotificationModal() {
	return useModalState((s) => s.showModal);
}

export type NotificationModalColorScheme = {
	text?: string;
	textSecondary?: string;
	closeBtn?: string;
	border?: string;
	background?: string;
	indicator?: string;
	transactionHash?: string;
	bellPrimary?: string;
	bellSecondary?: string;
};

export type NotificationModalProps = {
	colorScheme?: NotificationModalColorScheme;
};

export function NotificationModal({ colorScheme }: NotificationModalProps) {
	const {
		notifications,
		total,
		markAllRead,
		isAllRead,
		isLoading,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useNotifications();

	const colorVariable = useColorVariable(colorScheme);

	const { isModalActive, hideModal: hideModal_ } = useModalState();
	const { isRead } = useReadingState();

	const hideModal = useRefCallback(() => {
		hideModal_();
		markAllRead();
	});

	return (
		<BaseModal onClickBg={hideModal} isActive={isModalActive}>
			<div className={styles.modal} style={colorVariable}>
				<div className={styles.header}>
					<Indicator disabled={isAllRead}>
						<Bell className={styles.headerBell} />
					</Indicator>
					<span className={styles.headerTitle}>Notifications</span>
					<button className={styles.closeBtn} onClick={hideModal}>
						<CloseIcon />
					</button>
				</div>

				<div className={styles.scrollArea}>
					{isLoading ? (
						<div className={styles.loader}>
							<Loading />
						</div>
					) : total > 0 ? (
						<div>
							{notifications.map((notification) => (
								<Item
									notification={notification}
									isRead={isRead(notification)}
									key={notification.transactionHash}
								/>
							))}

							<LoadMore
								onLoadMore={() => fetchNextPage()}
								hasMore={!!hasNextPage}
								isLoading={isFetchingNextPage}
							/>
						</div>
					) : (
						<div className={styles.noNotificationTips}>No notification yet</div>
					)}
				</div>
			</div>
		</BaseModal>
	);
}

function useColorVariable(color: NotificationModalColorScheme = {}) {
	return React.useMemo(() => {
		const style: Record<string, string> = {};

		Object.entries(color).forEach(([key, value]) => {
			style[`--csb-notification-color-${key}`] = value;
		});

		return style as React.CSSProperties;
	}, [color]);
}
