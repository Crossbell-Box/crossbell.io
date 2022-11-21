import React from "react";
import { Text, Button } from "@mantine/core";

import { useModalStore, useScenesStore } from "../stores";

export type HeaderProps = {
	title: React.ReactNode;
	leftNode?: React.ReactNode;
	rightNode?: React.ReactNode;
};

export function Header({ title, leftNode, rightNode }: HeaderProps) {
	const isAbleToGoBack = useScenesStore(
		({ computed }) => computed.isAbleToGoBack
	);
	const goBack = useScenesStore(({ goBack }) => goBack);
	const { hide } = useModalStore();

	return (
		<div
			data-animation="fade-in"
			className="flex items-center gap-1 pb-10px px-21px pt-23px"
		>
			<div>
				{leftNode || (
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
				)}
			</div>
			<div className="mx-auto text-16px font-500">{title}</div>
			<div>
				{rightNode || (
					<Button
						className="h-auto p-5px text-22px"
						variant="subtle"
						color="gray"
						compact
						onClick={hide}
					>
						<Text className="i-csb:close" />
					</Button>
				)}
			</div>
		</div>
	);
}
