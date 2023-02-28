import React from "react";

import {
	DynamicScenesHeader,
	ModalHeaderProps,
	SelectCharacters as Main,
	SelectCharactersProps as Props,
} from "../../components";

import styles from "./index.module.css";

export type SelectCharactersProps = Props & {
	Header?: React.ComponentType<ModalHeaderProps>;
};

export function SelectCharacters({
	Header: Header_,
	...props
}: SelectCharactersProps) {
	const Header = Header_ ?? DynamicScenesHeader;
	return (
		<div className={styles.container}>
			<Header title="Your Characters" />

			<div className={styles.main}>
				<Main {...props} />
			</div>
		</div>
	);
}
