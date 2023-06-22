import React from "react";
import { Loading } from "@crossbell/ui";

import styles from "./index.module.css";
import { DynamicScenesContainer } from "../dynamic-scenes-container";

export function createLazyDynamicScene<T extends object>(
	Component: React.ComponentType<T>
) {
	return function LazyModal(props: T) {
		return (
			<React.Suspense fallback={<Placeholder />}>
				<Component {...props} />
			</React.Suspense>
		);
	};
}

function Placeholder() {
	return (
		<DynamicScenesContainer>
			<div className={styles.placeholder}>
				<Loading />
			</div>
		</DynamicScenesContainer>
	);
}
