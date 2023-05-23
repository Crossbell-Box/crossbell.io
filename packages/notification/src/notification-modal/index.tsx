import React from "react";
import { useRefCallback } from "@crossbell/util-hooks";
import {
	BaseModal,
	LoadMore,
	CloseIcon,
	Indicator,
	Loading,
} from "@crossbell/ui";
import type { NotificationTypeKey } from "crossbell";

import { useModalState, useNotifications } from "../hooks";

import styles from "./index.module.css";
import { Bell } from "./components/bell";
import { Item } from "./components/item";
import { Tabs } from "./components/tabs";

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

enum TabItem {
	all = "all",
	interactions = "interactions",
	earnings = "earnings",
}

const itemTypesMap: Record<TabItem, NotificationTypeKey[]> = {
	all: [
		"OPERATOR_ADDED",
		"OPERATOR_REMOVED",
		"LINKED",
		"UNLINKED",
		"NOTE_MINTED",
		"NOTE_POSTED",
		"MENTIONED",
		"TIPPED",
	],
	interactions: [
		"OPERATOR_ADDED",
		"OPERATOR_REMOVED",
		"LINKED",
		"UNLINKED",
		"NOTE_POSTED",
		"MENTIONED",
	],
	earnings: ["NOTE_MINTED", "TIPPED"],
};

export function NotificationModal({ colorScheme }: NotificationModalProps) {
	const [currentTypeId, setCurrentTypeId] = React.useState(TabItem.all);

	const {
		notifications,
		total,
		markAllRead,
		isAllRead,
		unreadCount,
		isLoading,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useNotifications({ types: itemTypesMap[currentTypeId] });

	const colorVariable = useColorVariable(colorScheme);

	const { isModalActive, hideModal: hideModal_ } = useModalState();

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

				<Tabs
					items={[
						{ name: "View All", id: TabItem.all, count: unreadCount },
						{ name: "Interactions", id: TabItem.interactions },
						{ name: "Earnings", id: TabItem.earnings },
					]}
					currentTypeId={currentTypeId}
					onSelectTab={setCurrentTypeId}
				/>

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
									isRead={isAllRead || notification.isReadBefore}
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
