import React from "react";
import { InView } from "react-intersection-observer";

import { Loading } from "../loading";
import styles from "./index.module.css";

export function LoadMore({
	hasMore,
	onLoadMore,
	children,
	isLoading,
}: {
	hasMore: boolean;
	onLoadMore: () => void;
	children?: React.ReactNode;
	isLoading: boolean;
}) {
	return (
		<>
			{hasMore && (
				<InView
					key={`${isLoading}`}
					triggerOnce={true}
					marginHeight={200}
					onChange={(inView) => {
						if (inView) {
							onLoadMore();
						}
					}}
				>
					{({ ref }) =>
						children || (
							<div ref={ref} className={styles.loading}>
								<Loading />
							</div>
						)
					}
				</InView>
			)}
		</>
	);
}
