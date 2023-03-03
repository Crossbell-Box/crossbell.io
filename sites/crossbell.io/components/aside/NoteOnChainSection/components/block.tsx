import type { QueryStatus } from "@tanstack/react-query";
import { Text, Loader, Center, Tooltip, Collapse } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classNames from "classnames";
import React from "react";

import styles from "./block.module.css";
import { BlockSection, BlockSectionProps } from "./block-section";

export type BlockProps = {
	title: string;
	tips: React.ReactNode;
	icon: React.ReactNode;
	sections: BlockSectionProps[];
	status: QueryStatus;
};

export function Block({ title, tips, icon, sections, status }: BlockProps) {
	const [isExpanded, { toggle: toggleIsExpanded }] = useDisclosure(false);

	return (
		<div className={styles.container}>
			<div className={styles.header} onClick={toggleIsExpanded}>
				<div className={styles.icon}>{icon}</div>

				<span className={styles.title} title={title}>
					{title}
				</span>

				{tips && (
					<Tooltip
						offset={4}
						label={tips}
						openDelay={200}
						multiline={true}
						transitionProps={{ transition: "pop-bottom-left" }}
						classNames={{ tooltip: styles.tooltip }}
					>
						<button className={styles.tipsBtn}>
							<Text className="i-csb:circle-help" />
						</button>
					</Tooltip>
				)}

				<Text
					className={classNames(
						isExpanded ? "i-csb:circle-minus" : "i-csb:circle-plus",
						isExpanded && styles.isExpanded,
						styles.toggleIndicator
					)}
				/>
			</div>
			<Collapse in={isExpanded}>
				{(() => {
					switch (status) {
						case "success":
							return sections.map((section, index) => (
								<React.Fragment key={section.title}>
									{index !== 0 && <div className={styles.hr} />}
									<BlockSection {...section} />
								</React.Fragment>
							));
						case "loading":
							return (
								<Center className="h-105px">
									<Loader />
								</Center>
							);
						case "error":
							return (
								<Center className="h-80px">
									<Text className="text-red-primary font-bold">
										Loading Error :(
									</Text>
								</Center>
							);
					}
				})()}
			</Collapse>
		</div>
	);
}
