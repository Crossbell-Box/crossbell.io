import React from "react";
import classNames from "classnames";
import prettyBytes from "pretty-bytes";
import { Text, Switch, LoadingOverlay } from "@mantine/core";

import Avatar from "@/components/common/Avatar";
import { useCurrentCharacter } from "@/utils/apis/indexer";
import { useCharacterMediaUsage } from "@/utils/apis/operator-sync";
import { extractCharacterName } from "@/utils/metadata";

import { openGuideModal } from "./modals";
import { useToggleOperator } from "./hooks";
import styles from "./character-section.module.css";

export default function CharacterSection() {
	const { data: character } = useCurrentCharacter();
	const { data: mediaUsage } = useCharacterMediaUsage(character?.characterId);
	const characterName = React.useMemo(
		() => extractCharacterName(character),
		[character]
	);

	const { toggleOperator, hasOperator, isTogglingOperator } =
		useToggleOperator();

	return (
		<div>
			<LoadingOverlay visible={isTogglingOperator} />
			<div className="flex items-center pt-15px pb-13px">
				<h4 className="font-deca my-0 text-18px font-600">xSync account</h4>
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
