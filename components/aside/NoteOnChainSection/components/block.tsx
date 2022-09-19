import type { QueryStatus } from "@tanstack/react-query";
import { Text, Loader, Center } from "@mantine/core";
import { useToggle } from "react-use";
import classNames from "classnames";
import React from "react";

import { Collapsible } from "@/components/common/Collapsible";

import styles from "./block.module.css";
import { BlockSection, BlockSectionProps } from "./block-section";

export type BlockProps = {
	title: string;
	icon: React.ReactNode;
	sections: BlockSectionProps[];
	status: QueryStatus;
};

export function Block({ title, icon, sections, status }: BlockProps) {
	const [isCollapsed, toggleIsCollapsed] = useToggle(true);

	return (
		<div className={styles.container}>
			<div className={styles.header} onClick={toggleIsCollapsed}>
				<div className={styles.icon}>{icon}</div>
				<span className={styles.title} title={title}>
					{title}
				</span>
				<Text
					className={classNames(
						isCollapsed ? "i-csb:circle-plus" : "i-csb:circle-minus",
						isCollapsed && styles.isCollapsed,
						styles.toggleIndicator
					)}
				/>
			</div>
			<Collapsible isCollapsed={isCollapsed} refreshDeps={[status]}>
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
			</Collapsible>
		</div>
	);
}
