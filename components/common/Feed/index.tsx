import { FeedEntity } from "crossbell.js";
import { Note, NoteSkeleton } from "../Note";

export function Feed({ feed }: { feed: FeedEntity }) {
	if (feed.note) {
		return <Note note={feed.note} />;
	} else {
		return <div>{feed.type}</div>;
	}
}

export function FeedSkeleton() {
	return <NoteSkeleton />;
}
