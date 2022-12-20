import React from "react";
import { Avatar as BaseAvatar, AvatarProps } from "@mantine/core";

import { UserCircleIcon } from "@crossbell/ui";
import { useAccountCharacter } from "@crossbell/connect-kit";

import { Avatar } from "~/shared/components/avatar";

export const maxThumbnailCount = 4;

export const avatarStyles: AvatarProps = {
	size: 24,
	radius: "xl",
	className: "border-none",
};

const avatarColors = ["#DADEE7", "#B8BFCE", "#8B93A5", "#717C97"];

export function AvatarsPlaceholder() {
	const currentCharacter = useAccountCharacter();

	return (
		<BaseAvatar.Group spacing="sm" className="flex-row-reverse">
			{Array.from({ length: maxThumbnailCount - 1 }).map((_, key) => (
				<BaseAvatar
					key={key}
					{...avatarStyles}
					styles={{ placeholder: { background: avatarColors[key] } }}
				>
					{" "}
				</BaseAvatar>
			))}

			{currentCharacter ? (
				<Avatar {...avatarStyles} character={currentCharacter} />
			) : (
				<BaseAvatar
					{...avatarStyles}
					styles={{
						placeholder: {
							color: avatarColors[maxThumbnailCount - 1],
							background: "currentColor",
						},
					}}
				>
					<UserCircleIcon className="w-full h-full" />
				</BaseAvatar>
			)}
		</BaseAvatar.Group>
	);
}
