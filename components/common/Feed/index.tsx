import { FeedEntity } from "crossbell.js";
import { Note, NoteSkeleton } from "../Note";

export function Feed({
	feed,
	collapsible: collapsible,
}: {
	collapsible?: boolean;
	feed: FeedEntity;
}) {
	if (feed.note) {
		return (
			<Note
				note={feed.note}
				character={feed.character}
				collapsible={collapsible}
			/>
		);
	} else {
		return <div>{feed.type}</div>;
	}
}

export function FeedSkeleton() {
	return <NoteSkeleton />;
}
