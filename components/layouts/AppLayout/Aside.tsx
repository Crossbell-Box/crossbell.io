import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Aside as Aside_, Title, Space, TextInput, Text } from "@mantine/core";

import TrendingCharactersSection from "@/components/aside/TrendingCharactersSection";
import TrendingNotesSection from "@/components/aside/TrendingNotesSection";
import { NoteOnChainSection } from "@/components/aside/NoteOnChainSection";
import { AchievementSection } from "@/components/aside/AchievementSection";
import { useSearchInput } from "@/components/common/Input/SearchInput";

export default function Aside() {
	const router = useRouter();
	const isSearchPage = router.pathname === "/search";
	const isNoteDetailPage = router.pathname.startsWith("/notes");
	const isCharacterPage = router.pathname === "/[handle]";

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
					// scrollContainer: "#main-viewport",
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
						className="bg-transparent min-h-100vh"
						hiddenBreakpoint="sm"
						height="auto"
						// width={{ sm: 300, lg: 400 }}
					>
						<div className="p-4">
							{!isSearchPage && <SearchInput />}

							<Space h={10} />

							{(() => {
								const commonSections = (
									<>
										<Space h={10} />
										<TrendingNotesSection />
										<Space h={10} />

										<Space h={10} />
										<TrendingCharactersSection />
										<Space h={10} />
									</>
								);

								if (
									isNoteDetailPage &&
									typeof router.query.noteid === "string"
								) {
									return (
										<>
											<Space h={10} />
											<NoteOnChainSection noteId={router.query.noteid} />
											<Space h={10} />
										</>
									);
								}

								if (isCharacterPage) {
									return (
										<>
											<Space h={10} />
											<AchievementSection />
											<Space h={10} />
											{commonSections}
										</>
									);
								}

								return commonSections;
							})()}
						</div>
					</Aside_>
				</div>
			</div>
		</>
	);
}

function SearchInput() {
	const searchInputProps = useSearchInput();

	return (
		<div>
			<TextInput
				icon={<Text className="i-csb:search text-24px text-[#687792]" />}
				placeholder="Search"
				classNames={{
					wrapper: "text-[#687792]",
					input:
						"rounded-12px border-[#E1E8F7] focus:border-[#687792] font-500",
				}}
				size="md"
				{...searchInputProps}
			/>
		</div>
	);
}
