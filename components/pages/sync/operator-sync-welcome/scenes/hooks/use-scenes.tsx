import React from "react";

import Image from "@/components/common/Image";

import { SceneConfig } from "../types";

export function getScenes(): SceneConfig[] {
	return [
		{
			id: "1",
			modalIllustration: "/images/sync/modal-process-1.png",
			illustration: (
				<div className="absolute left-2vw top-1/2 w-500px h-400px overflow-hidden transform -translate-y-1/2">
					<Image
						src="/images/sync/hands-3d.png"
						className="object-contain absolute -left-4vw top-0"
						placeholder="empty"
						width={500}
						height={500}
					/>
				</div>
			),
			description:
				"xSync is a function that helps you sync all your social media content onto Crossbell, where your data belongs to\nY❤️U.",
		},
		{
			id: "2",
			modalIllustration: "/images/sync/modal-process-2.png",
			illustration: (
				<div className="absolute left-2vw top-1/2 transform -translate-y-1/2">
					<Image
						src="/images/sync/process1.png"
						className="object-contain"
						placeholder="empty"
						width={313}
						height={496}
					/>
				</div>
			),
			description:
				"Activate the operator for your character, who will continuously sync your social media content. And it can be deactivated by you, at any time you want.",
		},
		{
			id: "3",
			modalIllustration: "/images/sync/modal-process-3.png",
			illustration: (
				<div className="absolute left-2vw top-1/2 transform -translate-y-1/2">
					<Image
						src="/images/sync/process2.png"
						className="object-contain"
						placeholder="empty"
						width={309.1}
						height={232.1}
					/>
				</div>
			),
			description:
				"Select the desired platform you wish to bind. You can always unbind your platform at any time.",
		},
		{
			id: "4",
			modalIllustration: "/images/sync/modal-process-4.png",
			illustration: (
				<div className="absolute left-2vw top-1/2 transform -translate-y-1/2">
					<Image
						src="/images/sync/process3.png"
						className="object-contain"
						placeholder="empty"
						width={313}
						height={496}
					/>
				</div>
			),
			description: "Verify your social media accounts.",
		},
		{
			id: "5",
			modalIllustration: "/images/sync/modal-process-5.png",
			illustration: (
				<div className="absolute left-2vw top-1/2 transform -translate-y-1/2">
					<Image
						src="/images/sync/process4.png"
						className="object-contain"
						placeholder="empty"
						width={313}
						height={496}
					/>
				</div>
			),
			description:
				"Done! You can now own all of your created content. Your content can be viewed on the feed and also on the txn scan.",
		},
	];
}

export function useScenes() {
	return React.useMemo(getScenes, []);
}
