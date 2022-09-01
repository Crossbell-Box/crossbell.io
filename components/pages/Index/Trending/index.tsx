import TrendingCharacters from "@/components/pages/Index/Trending/Characters";
import TrendingTreasures from "@/components/pages/Index/Trending/Treasures";
import TrendingLists from "@/components/pages/Index/Trending/Lists";
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
