import React from "react";
import { Text, Button } from "@mantine/core";

import { ModalHeaderProps, ModalHeader } from "../../../components";

import { useModalStore, useScenesStore } from "../stores";

export type HeaderProps = ModalHeaderProps;

export function Header({ title, leftNode, rightNode }: HeaderProps) {
	const isAbleToGoBack = useScenesStore(
		({ computed }) => computed.isAbleToGoBack
	);
	const goBack = useScenesStore(({ goBack }) => goBack);
	const { hide } = useModalStore();

	return (
		<ModalHeader
			title={title}
			leftNode={
				leftNode || (
					<Button
						className="h-auto p-5px text-22px"
						variant="subtle"
						color="gray"
						compact
						onClick={goBack}
						disabled={isAbleToGoBack}
					>
						<Text className="i-csb:back transform translate-x-1/4" />
					</Button>
				)
			}
			rightNode={
				rightNode || (
					<Button
						className="h-auto p-5px text-22px"
						variant="subtle"
						color="gray"
						compact
						onClick={hide}
					>
						<Text className="i-csb:close" />
					</Button>
				)
			}
		/>
	);
}
