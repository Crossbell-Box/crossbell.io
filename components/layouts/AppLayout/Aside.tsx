import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Aside as Aside_, TextInput, Text, Stack } from "@mantine/core";

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
		<div className="sidebar w-401px hidden md:block">
			<div className="sidebar__inner">
				<Aside_
					className="bg-transparent min-h-100vh"
					hiddenBreakpoint="sm"
					height="auto"
				>
					<div className="p-4">
						<Stack spacing={32}>
							{!isSearchPage && <SearchInput />}

							{(() => {
								if (
									isNoteDetailPage &&
									typeof router.query.noteid === "string"
								) {
									return (
										<>
											<NoteOnChainSection noteId={router.query.noteid} />
										</>
									);
								}

								return (
									<>
										{isCharacterPage && <AchievementSection />}
										<TrendingNotesSection />
										<TrendingCharactersSection />
									</>
								);
							})()}
						</Stack>
					</div>
				</Aside_>
			</div>
		</div>
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
