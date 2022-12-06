import {
	Button,
	createPolymorphicComponent,
	type ButtonProps,
} from "@mantine/core";
import classNames from "classnames";
import { forwardRef } from "react";
import { ConnectButtonProps } from ".";

type BaseButtonProps = ButtonProps & Pick<ConnectButtonProps, "mode">;
const BaseButton_ = forwardRef<HTMLButtonElement, BaseButtonProps>(
	({ children, mode, className, ...props }, ref) => {
		return (
			<Button
				ref={ref}
				className={classNames(
					"overflow-hidden rounded-12px w-full cursor-pointer px-4",
					{
						"h-92px": mode === "default",
						// "h-auto": mode === "minimal",
					},
					className
				)}
				{...props}
			>
				{children}
			</Button>
		);
	}
);
BaseButton_.displayName = "BaseButton";
const BaseButton = createPolymorphicComponent<"button", BaseButtonProps>(
	BaseButton_
);

export default BaseButton;
