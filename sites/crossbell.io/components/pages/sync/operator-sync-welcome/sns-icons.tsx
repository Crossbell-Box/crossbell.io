import React from "react";

import Image from "@/components/common/Image";

export const SNSIcons = React.memo(function Bg() {
	return (
		<div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden -z-1">
			<div
				className="absolute -left-80px -top-26px"
				style={{ transform: "rotate(15deg)" }}
			>
				<Image
					src="/images/logos-3d/twitter.png"
					alt="Twitter Icon"
					placeholder="empty"
					width={251}
					height={251}
					quality={90}
				/>
			</div>
			<div
				className="absolute -right-20px top-65px"
				style={{ transform: "matrix(-0.97, 0.26, 0.26, 0.97, 0, 0)" }}
			>
				<Image
					src="/images/logos-3d/instagram.png"
					alt="Instagram Icon"
					placeholder="empty"
					width={128}
					height={128}
					quality={90}
				/>
			</div>
			<div
				className="absolute left-0 bottom-44px"
				style={{ transform: "rotate(-30deg)" }}
			>
				<Image
					src="/images/logos-3d/youtube.png"
					alt="Youtube Icon"
					placeholder="empty"
					width={96}
					height={96}
					quality={90}
				/>
			</div>
			<div
				className="absolute left-153px bottom-0"
				style={{ transform: "rotate(-36deg)" }}
			>
				<Image
					src="/images/logos-3d/pinterest.png"
					alt="Pinterest Icon"
					placeholder="empty"
					width={68}
					height={68}
					quality={90}
				/>
			</div>
			<div
				className="absolute -right-30px -bottom-16px"
				style={{ transform: "matrix(-0.93, -0.36, -0.36, 0.93, 0, 0)" }}
			>
				<Image
					src="/images/logos-3d/tiktok.png"
					alt="Tiktok Icon"
					placeholder="empty"
					width={168}
					height={168}
					quality={90}
				/>
			</div>
		</div>
	);
});
