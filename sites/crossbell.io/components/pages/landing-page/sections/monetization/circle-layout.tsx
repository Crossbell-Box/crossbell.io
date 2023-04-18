import React, { useRef, useEffect } from "react";
import classNames from "classnames";

export type CircleLayoutProps = {
	paddingPercentage: number;
} & React.HTMLAttributes<HTMLDivElement>;

export const CircleLayout = ({
	paddingPercentage,
	...props
}: CircleLayoutProps) => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const container = containerRef.current;
		const items = Array.from(container.children) as HTMLElement[];
		const itemCount = items.length;
		const containerWidth = container.offsetWidth;
		const containerHeight = container.offsetHeight;
		const padding =
			(Math.min(containerWidth, containerHeight) * paddingPercentage) / 100;
		const radius = Math.min(containerWidth, containerHeight) / 2 - padding;
		const centerX = containerWidth / 2;
		const centerY = containerHeight / 2;

		items.forEach((item, index) => {
			const angle = ((2 * Math.PI) / itemCount) * index;
			const x = centerX + radius * Math.cos(angle);
			const y = centerY + radius * Math.sin(angle);

			item.style.left = `${(x / containerWidth) * 100}%`;
			item.style.top = `${(y / containerHeight) * 100}%`;
		});
	}, [props.children, paddingPercentage]);

	return (
		<div
			className={classNames(
				"relative aspect-1/1 animate-spin animate-duration-[40s]",
				props.className
			)}
			ref={containerRef}
			{...props}
		/>
	);
};

export const CircleItem = ({ children }: React.PropsWithChildren) => {
	return (
		<div className="absolute flex bg-[#f0f] rounded-full w-0 h-0 animate-spin animate-duration-[20s]">
			<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
				{children}
			</div>
		</div>
	);
};
