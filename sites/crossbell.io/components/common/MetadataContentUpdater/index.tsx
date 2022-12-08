import { useSyncMetadataOfNote } from "@crossbell/indexer";
import { copyToClipboard } from "~/shared/other";
import { ActionIcon, Menu, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { LoadingOverlay } from "~/shared/components/loading-overlay";

export default function MetadataContentUpdater({
	uri,
	characterId,
	noteId,
	onUpdated,
}: {
	uri?: string;
	characterId: number;
	noteId: number;
	onUpdated?: () => void;
}) {
	const syncMetadataOfNote = useSyncMetadataOfNote(characterId, noteId);

	return (
		<div
			className="relative bg-gray/10 hover-bg-gray/15 px-2 py-2 rounded-sm break-words group"
			onClick={(e) => {
				e.stopPropagation();
			}}
		>
			<LoadingOverlay visible={syncMetadataOfNote.isLoading} />

			{!uri && (
				<div>
					<Text size="sm" color="dimmed">
						Failed to parse content. Reason: No URI found.
					</Text>
				</div>
			)}

			{uri && (
				<div>
					<div>
						<Text size="sm" color="dimmed">
							Failed to parse content from metadata URI
						</Text>
						<Text size="sm" color="dimmed">
							{uri}
						</Text>
					</div>

					{/* menu */}
					<div className="absolute top-5px right-5px opacity-0 group-hover:opacity-100 transition-opacity">
						<Menu
							classNames={{
								item: "w-100px",
							}}
						>
							<Menu.Target>
								<ActionIcon variant="default">
									<Text className="i-csb:more" />
								</ActionIcon>
							</Menu.Target>

							<Menu.Dropdown>
								<Menu.Item
									onClick={() => {
										syncMetadataOfNote.mutate(undefined, {
											onError: (err: any) => {
												showNotification({
													title: "Resyncing metadata failed",
													message: err.message,
													color: "red",
												});
											},
											onSuccess: (data) => {
												if (!data) {
													showNotification({
														title: "Resyncing metadata failed",
														message: "Nothing returned from this metadata URI",
														color: "red",
													});
												} else {
													showNotification({
														message: "Resynced metadata successfully",
														color: "green",
													});
													onUpdated?.();
												}
											},
										});
									}}
								>
									Resync
								</Menu.Item>
								<Menu.Item
									onClick={() => {
										copyToClipboard(uri, { showNotification: true });
									}}
								>
									Copy URI
								</Menu.Item>
							</Menu.Dropdown>
						</Menu>
					</div>
				</div>
			)}
		</div>
	);
}
