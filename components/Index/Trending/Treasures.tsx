import TrendingBase from "@/components/Index/Trending/_base";
import MintedNoteCard from "@/components/card/MintedNoteCard";
import { NoteEntity } from "crossbell.js";

const TrendingTreasures = ({ notes }: { notes: NoteEntity[] }) => (
	<TrendingBase
		title="Trending Treasures"
		intro="Here are the trending treasures of Crossbell"
		viewMoreLink="/explore"
	>
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
			{notes.map((n) => (
				<div
					key={`${n.characterId}-${n.noteId}`}
					className="aspect-ratio-video"
				>
					<MintedNoteCard note={n} />
				</div>
			))}
		</div>
	</TrendingBase>
);

export default TrendingTreasures;
