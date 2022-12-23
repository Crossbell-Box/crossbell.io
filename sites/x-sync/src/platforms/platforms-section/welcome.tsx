import React from "react";

import { openGuideModal } from "../../modals";

const style: React.CSSProperties = {
	background:
		"linear-gradient(288.05deg, #FEFEFE 10.92%, #F8F8FA 93.8%), #FAFCFF",
};

export function Welcome() {
	return (
		<div
			style={style}
			className="p-24px rounded-24px border border-1 border-[#E1E8F7] mb-24px"
		>
			<h4 className="mt-0 mb-16px text-[#262626] font-400 text-22px leading-28px">
				Welcome!!!
			</h4>
			<p className="m-0 font-400 text-16px leading-24px text-[#262626] children:text-[#5B89F7]">
				Try to bind a platform to sync your content! Visiting our{" "}
				<a href="https://xsync.crossbell.io/" target="_blank" rel="noreferrer">
					introduction page
				</a>
				{" to know more about sync feature, and also we have a "}
				<a className="cursor-pointer" onClick={openGuideModal}>
					sync guide
				</a>{" "}
				for you.
			</p>
		</div>
	);
}
