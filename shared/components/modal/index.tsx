import React, { type PropsWithChildren } from "react";
import {
	Modal as Modal_,
	Text,
	Button,
	type ModalProps,
	Space,
} from "@mantine/core";
import { openModal } from "@mantine/modals";

export function Modal({
	children,
	confirmText,
	confirmType,
	onConfirm = () => {},
	...props
}: PropsWithChildren<
	{
		title?: string;
		confirmText?: string;
		confirmType?: "primary" | "danger";
		onConfirm?: () => void;
	} & ModalProps
>) {
	return (
		<Modal_
			centered
			title={<Text className="font-bold text-2xl">{props.title}</Text>}
			styles={{
				title: { fontWeight: "bold" },
			}}
			withCloseButton={false}
			{...props}
		>
			<div className="my-5">{children}</div>

			<div className="flex flex-col">
				<Button
					size="lg"
					onClick={onConfirm}
					color={confirmType === "danger" ? "red" : "brand"}
				>
					Disconnect
				</Button>
				<Space h="sm" />
				<Button
					size="lg"
					onClick={() => props.onClose()}
					variant="outline"
					color="dark"
				>
					Cancel
				</Button>
			</div>
		</Modal_>
	);
}

export function openBorderlessModal(
	options: Parameters<typeof openModal>["0"]
) {
	return openModal({
		styles: { content: { background: "transparent" } },
		padding: 0,
		...options,
	});
}
