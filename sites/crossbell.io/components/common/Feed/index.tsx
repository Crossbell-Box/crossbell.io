import { FeedEntity } from "crossbell.js";
import { GroupedFeedNote } from "@/components/grouped-note";

import { NoteSkeleton } from "../Note";

export function Feed({
	feed,
	collapsible: collapsible,
}: {
	collapsible?: boolean;
	feed: FeedEntity;
}) {
	if (feed.note) {
		return <GroupedFeedNote note={feed.note} collapsible={collapsible} />;
	} else {
		return <div>{feed.type}</div>;
	}
}

export function FeedSkeleton() {
	return <NoteSkeleton />;
}
