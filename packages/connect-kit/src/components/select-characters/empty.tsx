import React from "react";
import { useWeb2Url } from "@crossbell/ui";

import { IMAGES } from "../../utils";
import { ListProps } from "./list";

import styles from "./empty.module.css";

export type EmptyProps = Pick<ListProps, "onSelectNew">;

export function Empty({ onSelectNew }: EmptyProps) {
	const addImg = useWeb2Url(IMAGES.addBtnImg);

	return (
		<div className={styles.container}>
			<div className={styles.main} onClick={onSelectNew}>
				<img src={addImg} className={styles.img} alt="Mint Button" />
				<h3 className={styles.title}>Click to mint</h3>
			</div>
		</div>
	);
}
