import TrendingCharacters from "@/components/Index/Trending/Characters";
import TrendingTreasures from "@/components/Index/Trending/Treasures";
import TrendingLists from "@/components/Index/Trending/Lists";
import { useTrending } from "@/utils/apis/trending";

const IndexTrending = () => {
	const { data } = useTrending();

	return (
		<>
			<div className={"m-auto max-w-340 px-8"}>
				{data && (
					<>
						{data.character && (
							<TrendingCharacters characters={data.character} />
						)}
						{data.note && <TrendingTreasures notes={data.note} />}
						{/* <TrendingLists list={data.list} /> */}
					</>
				)}
			</div>
		</>
	);
};

export default IndexTrending;
