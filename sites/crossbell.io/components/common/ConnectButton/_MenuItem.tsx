import { MenuItemProps, Menu, createPolymorphicComponent } from "@mantine/core";
import { PropsWithChildren } from "react";

function _MenuItem({
	children,
	...props
}: PropsWithChildren<
	MenuItemProps & React.ComponentPropsWithoutRef<"button">
>) {
	return (
		<Menu.Item className="p-3 cursor-pointer bg-hover" {...props}>
			{children}
		</Menu.Item>
	);
}
const MenuItem = createPolymorphicComponent<"button", MenuItemProps>(_MenuItem);

export default MenuItem;
