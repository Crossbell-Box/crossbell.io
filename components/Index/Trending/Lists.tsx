import Avatar from "@/components/common/Avatar";
import TrendingBase from "@/components/Index/Trending/_base";
import { TrendingRawResponse } from "@/utils/apis/trending";
import { ipfsLinkToHttpLink } from "@/utils/ipfs";

// Mantine v5.0.0-alpha.19 doesn't have AvatarsGroup element
// like in previous versions (v4.2.12), and the new AvatarGroup
// doesn't support setting limitations for automatically extend,
// so we need to manually implement one here.
const AvatarsGroupWithLimit = ({
	avatars,
	limit,
}: {
	avatars: string[];
	limit: number;
}) => (
	<div className="flex flex-row items-center">
		<div
			className="w-24 h-24 rounded-full -mt-6"
			style={{
				zIndex: limit + 1,
			}}
		>
			<Avatar className="border border-white border-.2rem" src={avatars[0]} />
		</div>
		{avatars.slice(1, limit).map((avatar, index) => (
			<div
				className="w-18 h-18 rounded-full -ml-2rem"
				key={index}
				style={{
					zIndex: limit - index,
				}}
			>
				<img
					className="w-full h-full rounded-full object-cover border border-white border-.2rem"
					src={avatar}
				/>
			</div>
		))}
		{avatars.length > limit ? (
			<div
				className="w-18 h-18 rounded-full -ml-2rem"
				style={{
					zIndex: 0,
				}}
			>
				<div className="w-full h-full rounded-full bg-yellow border border-white border-.2rem font-bold text-sm flex justify-end items-center pr-3">
					+{avatars.length - limit}
				</div>
			</div>
		) : (
			Array.from({ length: limit - avatars.length + 1 }).map((_, index) => (
				<div key={index} className="w-18 h-18 rounded-full -ml-2rem" />
			))
		)}
	</div>
);

const TrendingLists = ({ list }: { list: TrendingRawResponse["list"] }) => (
	<TrendingBase
		title="Trending Lists"
		intro="Lists of characters that you may find interesting"
		viewMoreLink="/feed"
	>
		<div className="flex flex-col gap-8">
			{list.map((el) => (
				<div
					key={el.id}
					className="flex flex-col md:flex-row gap-3 bg-white py-8 pl-8 rounded-2xl"
				>
					<div className="flex">
						{/* <AvatarsGroupWithLimit
							avatars={[
								el.start_icon,
								...el.characters.map((character) =>
									ipfsLinkToHttpLink(character.avatar)
								),
							]}
							limit={4}
						/> */}
					</div>
					<div className="flex items-center text-2xl text-left">{el.intro}</div>
				</div>
			))}
		</div>
	</TrendingBase>
);

export default TrendingLists;
