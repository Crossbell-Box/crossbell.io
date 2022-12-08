import React from "react";
import classNames from "classnames";
import prettyBytes from "pretty-bytes";
import { Text, Switch } from "@mantine/core";

import { Avatar } from "~/shared/components/avatar";
import { useAccountState, useAccountCharacter } from "@crossbell/connect-kit";
import { useCharacterMediaUsage } from "@crossbell/connect-kit";
import { extractCharacterName } from "@crossbell/util-metadata";
import LoadingOverlay from "@/components/common/LoadingOverlay";

import { openGuideModal } from "./modals";
import { useToggleOperator } from "./hooks";
import styles from "./character-section.module.css";

export default function CharacterSection() {
	const account = useAccountState((s) => s.computed.account);
	const character = useAccountCharacter();
	const { data: mediaUsage } = useCharacterMediaUsage(account?.characterId);
	const characterName = React.useMemo(
		() => extractCharacterName(character),
		[character]
	);

	const { toggleOperator, hasOperator, isTogglingOperator } =
		useToggleOperator();

	return (
		<div>
			<LoadingOverlay
				visible={isTogglingOperator}
				overlayBlur={2}
				description="Waiting for the transaction to be confirmed"
			/>
			<div className="flex items-center pt-15px pb-13px">
				<h4 className="font-deca my-0 text-18px font-600">xSync Account</h4>
				<button
					className={classNames(
						"ml-1px transform -translate-y-2/3",
						"text-16px bg-transparent border-none outline-none color-black p-0 cursor-pointer"
					)}
					onClick={openGuideModal}
				>
					<Text className="i-csb:circle-help" />
				</button>
				<Switch
					disabled={account?.type === "email"}
					checked={hasOperator}
					onChange={toggleOperator}
					className={styles.switch}
					onLabel="ON"
					offLabel="OFF"
					size="md"
					color="blue"
				/>
			</div>
			<div>
				{character ? (
					<div className="flex items-center">
						<Avatar character={character} size={48} />
						<div className="ml-27px mr-10px">
							<div className="flex font-600 text-18px leading-21px text-[#082135] mb-4px">
								{characterName}
							</div>
							<div className="flex font-400 text-16px leading-19px text-[#B7BFCA]">
								@{character.handle}
							</div>
						</div>
						<div className="text-black font-deca ml-auto flex items-center">
							<span className="text-18px font-600 leading-18px">
								{prettyBytes(mediaUsage ?? 0, { maximumFractionDigits: 2 })}/
							</span>
							<span className="text-24px font-600 leading-24px">∞</span>
						</div>
					</div>
				) : (
					<div>No character</div>
				)}
			</div>
		</div>
	);
}
