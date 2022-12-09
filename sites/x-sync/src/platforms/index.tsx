import React from "react";
import { Loader } from "@mantine/core";
import { useRouter } from "next/router";

import {
	useAccountCharacterId,
	useCharacterBoundAccounts,
} from "@crossbell/connect-kit";

import { Sidebar } from "@/components";

import CharacterSection from "./character-section";
import PlatformsSection from "./platforms-section";

export function Platforms() {
	const { characterId, ssrReady } = useAccountCharacterId();
	const boundAccounts = useCharacterBoundAccounts(characterId);
	const router = useRouter();

	React.useEffect(() => {
		if (ssrReady && !characterId) {
			router.replace("/");
		}
	}, [ssrReady, characterId, router]);

	if (boundAccounts.isLoading) {
		return (
			<div className="fixed inset-0 flex items-center justify-center">
				<Loader />
			</div>
		);
	}

	return (
		<div className="flex">
			<div className="border-r-1 border-[#E1E8F7]">
				<Sidebar />
			</div>
			<div className="pl-32px pr-64px flex-1">
				<CharacterSection />
				<hr className="my-24px border-none h-1px w-full bg-[#E1E8F7]" />
				<PlatformsSection />
			</div>
		</div>
	);
}
