import TrendingBase from "@/components/Index/Trending/_base";
import { TrendingCharacterCard } from "@/components/card/TrendingCharacterCard";
import { CharacterEntity } from "crossbell.js";

const TrendingCharacters = ({
	characters,
}: {
	characters: CharacterEntity[];
}) => (
	<TrendingBase
		title="Trending Characters"
		intro="Here are the trending characters of Crossbell"
		viewMoreLink="/feed"
	>
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-7">
			{characters.map((character) => (
				<TrendingCharacterCard
					key={character.characterId}
					character={character}
				/>
			))}
		</div>
	</TrendingBase>
);

export default TrendingCharacters;
