import React from "react";
import { Loading } from "@crossbell/ui";

import styles from "./index.module.css";
import { DynamicScenesContainer } from "../dynamic-scenes-container";

export function createLazyDynamicScene(Component: React.ComponentType) {
	return function LazyModal() {
		return (
			<React.Suspense fallback={<Placeholder />}>
				<Component />
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
