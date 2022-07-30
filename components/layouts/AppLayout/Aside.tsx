import SearchInput from "@/components/common/Input/SearchInput";
import { MediaQuery, Aside as Aside_, Text } from "@mantine/core";
import { useRouter } from "next/router";

export default function Aside() {
	const router = useRouter();
	const isSearchPage = router.pathname === "/search";

	return (
		<MediaQuery smallerThan="sm" styles={{ display: "none" }}>
			<Aside_
				p="md"
				className="bg-transparent sticky top-0"
				hiddenBreakpoint="sm"
				width={{ sm: 220, lg: 220 }}
			>
				{!isSearchPage && <SearchInput />}
			</Aside_>
		</MediaQuery>
	);
}
