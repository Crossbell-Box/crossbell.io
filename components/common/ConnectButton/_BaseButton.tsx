import {
	Button,
	createPolymorphicComponent,
	type ButtonProps,
} from "@mantine/core";
import classNames from "classnames";
import { forwardRef } from "react";

const BaseButton_ = forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, className, ...props }, ref) => {
		return (
			<Button
				ref={ref}
				className={classNames(
					"h-80px rounded-lg w-full cursor-pointer border-none px-2",
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
const BaseButton = createPolymorphicComponent<"button", ButtonProps>(
	BaseButton_
);

export default BaseButton;
