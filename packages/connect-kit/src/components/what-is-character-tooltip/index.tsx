import React from "react";
import { useWeb2Url } from "@crossbell/ui";
import { Tooltip, TooltipProps } from "@mantine/core";

import { IMAGES } from "../../utils";
import { CrossbellIcon } from "../icons";

import styles from "./index.module.css";

export type WhatIsCharacterTooltipProps = Omit<TooltipProps, "label">;

export function WhatIsCharacterTooltip(props: WhatIsCharacterTooltipProps) {
	const imgUrl = useWeb2Url(IMAGES.whatIsCharacterImg);

	return (
		<Tooltip
			offset={4}
			withinPortal={true}
			px={20}
			py={16}
			radius={16}
			classNames={{ tooltip: styles.tooltip }}
			arrowSize={10}
			openDelay={200}
			multiline={true}
			transitionProps={{ transition: "pop" }}
			withArrow={true}
			{...props}
			label={
				<div className={styles.tooltipLabel}>
					<div className={styles.tooltipLabelIconSection}>
						<div>
							<CrossbellIcon className={styles.crossbellIcon} />
						</div>

						<div className={styles.whatIsCharacter}>
							<img
								className={styles.whatIsCharacterImg}
								src={imgUrl}
								alt="What Is Character"
							/>
						</div>
					</div>
					<h3 className={styles.whatIsCharacterTitle}>
						Guide - What is Character？
					</h3>
					<p className={styles.whatIsCharacterContent}>
						Character is your Crossbell profile where you can check all the
						content synced from other social media and also browse your treasure
						collection and achievements.
					</p>
				</div>
			}
		/>
	);
}
