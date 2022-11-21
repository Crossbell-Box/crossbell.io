import React from "react";

export type Selection = {
	id: string;
	title: React.ReactNode;
	icon: React.ReactNode;
	onClick: () => void;
};

export type SelectionsProps = {
	items: Selection[];
};

export function Selections({ items }: SelectionsProps) {
	return (
		<div className="flex flex-col gap-12px">
			{items.map((item) => (
				<div
					key={item.id}
					className="flex items-center bg-[#F7F7F7] hover:bg-[#F0F2F5] py-14px px-20px w-full rounded-12px cursor-pointer transition"
					onClick={item.onClick}
				>
					<span className="mr-auto text-16px leading-24px font-500">
						{item.title}
					</span>
					{item.icon}
				</div>
			))}
		</div>
	);
}
