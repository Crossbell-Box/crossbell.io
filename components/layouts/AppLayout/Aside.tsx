import TrendingCharactersSection from "@/components/aside/TrendingCharactersSection";
import TrendingNotesSection from "@/components/aside/TrendingNotesSection";
import SearchInput from "@/components/common/Input/SearchInput";
import { MediaQuery, Aside as Aside_, Text, Title, Space } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Aside() {
	const router = useRouter();
	const isSearchPage = router.pathname === "/search";

	useEffect(() => {
		const f = async () => {
			if (typeof window !== "undefined") {
				// @ts-ignore
				const StickySidebar = await import("sticky-sidebar-v2").then(
					(m) => m.default
				);
				new StickySidebar(".sidebar", {
					// topSpacing: 20,
					bottomSpacing: 50,
					containerSelector: ".main-content",
					innerWrapperSelector: ".sidebar__inner",
					scrollContainer: "#main-viewport",
				});
			}
		};

		f();
	}, []);

	return (
		<>
			{/* {!isSearchPage && (
				<div className="sticky top-0">
				<SearchInput />
				</div>
			)} */}

			<div className="sidebar w-300px lg:w-400px hidden sm:block">
				<div className="sidebar__inner">
					<Aside_
						className="bg-transparent"
						hiddenBreakpoint="sm"
						// width={{ sm: 300, lg: 400 }}
					>
						<div className="p-4">
							{!isSearchPage && (
								<div>
									<SearchInput />
								</div>
							)}

							<Space h={10} />

							<Title order={5}>Widgets</Title>

							<Space h={10} />
							<TrendingNotesSection />
							<Space h={10} />

							<Space h={10} />
							<TrendingCharactersSection />
							<Space h={10} />
						</div>
					</Aside_>
				</div>
			</div>
		</>
	);
}
