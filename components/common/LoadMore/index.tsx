import { LoadingOverlay } from "@mantine/core";
import { InView } from "react-intersection-observer";

export default function LoadMore({
	hasNextPage,
	children,
	onLoadMore,
	isLoading,
}: {
	hasNextPage: boolean;
	children: React.ReactNode;
	onLoadMore: () => void;
	isLoading: boolean;
}) {
	return (
		<>
			{isLoading && children}

			{!isLoading && hasNextPage && (
				<InView
					triggerOnce={true}
					marginHeight={200}
					onChange={(inView) => {
						if (inView) {
							onLoadMore();
						}
					}}
				>
					{({ inView, ref, entry }) => (
						<div
							ref={ref}
							style={{ width: "100%", height: 200, position: "relative" }}
						>
							<LoadingOverlay visible={true} />
						</div>
					)}
				</InView>
			)}
		</>
	);
}
