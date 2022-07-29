import SearchInput from "@/components/common/Input/SearchInput";
import { MediaQuery, Aside as Aside_, Text } from "@mantine/core";

export default function Aside() {
	return (
		<MediaQuery smallerThan="sm" styles={{ display: "none" }}>
			<Aside_
				p="md"
				className="bg-transparent sticky top-0"
				hiddenBreakpoint="sm"
				width={{ sm: 220, lg: 220 }}
			>
				<SearchInput />
			</Aside_>
		</MediaQuery>
	);
}
