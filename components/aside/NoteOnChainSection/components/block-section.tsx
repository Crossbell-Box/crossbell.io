import { useHandleLinkClick } from "@crossbell/ipfs-react";
import { Text } from "@mantine/core";
import React from "react";
import classNames from "classnames";

import { copyToClipboard } from "@/utils/other";

import styles from "./block-section.module.css";

export type BlockSectionProps = {
	title: string;
	link: string | null;
	detail: string | null;
	multiline?: boolean;
};

export function BlockSection({
	title,
	link,
	detail,
	multiline,
}: BlockSectionProps) {
	const copy = React.useCallback(
		() => detail && copyToClipboard(detail, { showNotification: true }),
		[detail]
	);

	const openLink = useHandleLinkClick();

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h6 className={styles.title} title={title}>
					{title}
				</h6>

				{detail && (
					<button className={styles.headerBtn} onClick={copy}>
						<Text className="i-csb:content-copy" />
					</button>
				)}

				{link && (
					<a
						className={styles.headerBtn}
						href={link}
						onClick={openLink}
						target="_blank"
						rel="noreferrer"
					>
						<Text className="i-csb:arrow-forward" />
					</a>
				)}
			</div>

			{detail && (
				<p
					className={classNames(styles.detail, multiline && styles.multiline)}
					title={detail}
				>
					{detail}
				</p>
			)}
		</div>
	);
}
