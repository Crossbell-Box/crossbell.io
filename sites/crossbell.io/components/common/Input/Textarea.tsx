import { Textarea as Textarea_, TextareaProps } from "@mantine/core";
import { PropsWithChildren } from "react";

export default function Textarea({
	...props
}: PropsWithChildren<TextareaProps>) {
	return <Textarea_ {...props} />;
}
