import { IpfsLink } from "@crossbell/ipfs-react";
import { Text } from "@mantine/core";
import React from "react";

import { copyToClipboard } from "~/shared/other";

import styles from "./block-section.module.css";

export type BlockSectionProps = {
	title: string;
	link: string | null;
	detail: string | null;
};

export function BlockSection({ title, link, detail }: BlockSectionProps) {
	const copy = React.useCallback(
		() => detail && copyToClipboard(detail, { showNotification: true }),
		[detail]
	);

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
					<IpfsLink
						className={styles.headerBtn}
						href={link}
						target="_blank"
						rel="noreferrer"
					>
						<Text className="i-csb:arrow-forward" />
					</IpfsLink>
				)}
			</div>

			{detail && (
				<p className={styles.detail} title={detail}>
					{detail}
				</p>
			)}
		</div>
	);
}
