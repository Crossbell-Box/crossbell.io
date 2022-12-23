import React from "react";
import { Loader } from "@mantine/core";
import { useRouter } from "next/router";

import {
	OPERATOR_ADDRESS,
	useAccountCharacterId,
	useCharacterBoundAccounts,
	useCharacterOperatorPermissions,
} from "@crossbell/connect-kit";

import { Sidebar } from "@/components";

import CharacterSection from "./character-section";
import PlatformsSection from "./platforms-section";

export function Platforms() {
	const { characterId, ssrReady } = useAccountCharacterId();
	const boundAccounts = useCharacterBoundAccounts(characterId);
	const router = useRouter();
	const characterOperatorPermissions =
		useCharacterOperatorPermissions(OPERATOR_ADDRESS);

	React.useEffect(() => {
		if (ssrReady && !characterId) {
			router.replace("/");
		}
	}, [ssrReady, characterId, router]);

	if (boundAccounts.isLoading || characterOperatorPermissions.isLoading) {
		return (
			<div className="fixed inset-0 flex items-center justify-center">
				<Loader />
			</div>
		);
	}

	return (
		<Sidebar>
			<div className="h-90px hidden sm:block">
				<h3
					className="absolute top-0 left-0 w-full m-0 p-32px font-600 text-24px -z-1"
					style={{
						background:
							"linear-gradient(transparent, transparent 50%, #FFF), url('/images/header-texture.svg')",
					}}
				>
					Platforms
				</h3>
			</div>
			<div className="mr-16px md:mr-32px">
				<CharacterSection />
				<hr className="my-24px border-none h-1px w-full bg-[#E1E8F7]" />
				<PlatformsSection />
			</div>
		</Sidebar>
	);
}
