import React from "react";

export type HooksRendererProps<T extends (...args: any[]) => any> = {
	hooks: T;
	params: Parameters<T>;

	children: (result: ReturnType<T>) => React.ReactNode;
};

export function HooksRenderer<T extends (...args: any[]) => any>({
	hooks,
	params,
	children,
}: HooksRendererProps<T>) {
	const result = hooks(...params);

	return <>{children(result)}</>;
}
