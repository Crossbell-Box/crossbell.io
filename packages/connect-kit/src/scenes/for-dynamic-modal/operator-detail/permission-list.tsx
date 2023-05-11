import React from "react";
import { CharacterOperatorEntity } from "crossbell";
import { LoadingOverlay, SettingsCheckmark1Icon } from "@crossbell/ui";
import { useCharacterOperatorPermissions } from "@crossbell/react-account";

import styles from "./permission-list.module.css";

export type PermissionListProps = {
	characterId: number;
	characterOperator: CharacterOperatorEntity;
};

export function PermissionList({
	characterId,
	characterOperator,
}: PermissionListProps) {
	const { data, isLoading } = useCharacterOperatorPermissions({
		characterId,
		operatorAddress: characterOperator.operator,
	});

	const permissions = React.useMemo(() => data?.sort() ?? [], [data]);

	return (
		<>
			{isLoading && <LoadingOverlay visible={isLoading} />}

			<div className={styles.container}>
				{permissions.map((permission) => (
					<div className={styles.item} key={permission}>
						<div>
							<a
								href={`https://github.com/Crossbell-Box/CIPs/blob/main/CIPs/CIP-7.md#:~:text=${permission}`}
								target="_blank"
								className={styles.permission}
							>
								{permission}
							</a>
							<div className={styles.description}>
								{capitalizeFirstLetter(
									permission
										.split("_")
										.map((word) => word.toLowerCase())
										.join(" ")
								)}
								.
							</div>
						</div>

						<SettingsCheckmark1Icon />
					</div>
				))}
			</div>
		</>
	);
}

function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
