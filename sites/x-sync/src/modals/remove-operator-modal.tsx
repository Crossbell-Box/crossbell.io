import React from "react";
import compact from "lodash.compact";
import { closeAllModals } from "@mantine/modals";
import { Button, LoadingOverlay, Text } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { Contract } from "crossbell.js";

import {
	useAccountCharacter,
	useToggleCharacterOperator,
} from "@crossbell/connect-kit";
import { openBorderlessModal } from "~/shared/components/modal";
import { Image } from "~/shared/components/image"
import {
	OPERATOR_ADDRESS,
	useCharacterBoundAccounts,
} from "@crossbell/connect-kit";
import { ContractProvider } from "@crossbell/contract";

import seeYouImage from "@/public/images/sync/see-you-later.svg";

export async function openRemoveOperatorModal(contract: Contract) {
	return new Promise<void>((resolve) =>
		openBorderlessModal({
			zIndex: 10000,
			children: (
				<ContractProvider contract={contract}>
					<RemoveOperatorModal />
				</ContractProvider>
			),
			classNames: { modal: "rounded-28px overflow-hidden w-auto" },
			closeOnEscape: false,
			closeOnClickOutside: false,
			onClose() {
				resolve();
			},
		})
	);
}

enum Scene {
	wannaRemoveTips = "wannaRemoveTips",
	boundOperatorExistTips = "boundOperatorExistTips",
	removed = "removed",
}

const closeModals = () => closeAllModals();

export function RemoveOperatorModal() {
	const character = useAccountCharacter();
	const { data: boundAccounts = [] } = useCharacterBoundAccounts(
		character?.characterId
	);
	const [scene, setScene] = React.useState(Scene.wannaRemoveTips);

	const [{ toggleOperator }, { isLoading: isRemoving }] =
		useToggleCharacterOperator(OPERATOR_ADDRESS);

	const removeOperator = React.useCallback(() => {
		if (!isRemoving && character?.characterId) {
			toggleOperator().then(() => {
				setScene(Scene.removed);
			});
		}
	}, [toggleOperator, isRemoving, character]);

	const ref = useClickOutside(() => {
		if (!isRemoving) {
			closeModals();
		}
	});

	return (
		<div className="bg-white" ref={ref}>
			<LoadingOverlay visible={isRemoving} />
			{(() => {
				switch (scene) {
					case Scene.wannaRemoveTips:
						return (
							<div className="p-24px w-312px">
								<h4 className="text-24px font-400 leading-32px m-0 mb-16px">
									Turn xSync off
								</h4>
								<p className="text-14px leading-20px font-400 m-0 mb-24px">
									{compact([
										"Are you sure you would like to stop syncing your platforms?",
										boundAccounts.length > 0 &&
											"If so, we suggest unbinding all platforms before turning sync off.",
									]).join(" ")}
								</p>
								<div className="flex justify-end items-center">
									<Button variant="subtle" color="blue" onClick={closeModals}>
										Cancel
									</Button>
									<Button
										variant="subtle"
										color="red"
										onClick={() => {
											if (boundAccounts.length > 0) {
												setScene(Scene.boundOperatorExistTips);
											} else {
												removeOperator();
											}
										}}
									>
										I‘ve decided
									</Button>
								</div>
							</div>
						);
					case Scene.boundOperatorExistTips:
						return (
							<div className="p-24px w-312px">
								<h4 className="text-24px font-400 leading-32px m-0 mb-16px flex items-center">
									<Text className="i-csb:risk text-32px mr-4px" />
									Serious issues!
								</h4>
								<p className="text-14px leading-20px font-400 m-0 mb-24px">
									{
										"If you don't unbind first, it can cause repeated content and wrong sync times. Are you sure you don't want to unbind?"
									}
								</p>
								<div className="flex justify-end items-center">
									<Button variant="subtle" color="blue" onClick={closeModals}>
										Unbind first
									</Button>
									<Button
										variant="subtle"
										color="red"
										onClick={() => removeOperator()}
									>
										I‘ve decided
									</Button>
								</div>
							</div>
						);
					case Scene.removed:
						return (
							<div>
								<div className="flex flex-col justify-center">
									<Image
										src={seeYouImage}
										placeholder="empty"
										className="w-87% h-auto -mt-8%"
									/>

									<p className="text-center font-500 text-16px leading-24px text-[#49454F] mt-0 mb-48px">
										Turn off successfully!
									</p>

									<Button
										className="w-328px h-40px block mx-auto mb-24px text-14px font-500"
										color="blue"
										radius={100}
										onClick={closeModals}
									>
										Awesome
									</Button>
								</div>
							</div>
						);
				}
			})()}
		</div>
	);
}
