import React from "react";

import { Image } from "~/shared/components/image";

import { SceneConfig } from "../types";

export const illustrations = [
	"/images/sync/process1.png",
	"/images/sync/process2.png",
	"/images/sync/process3.png",
	"/images/sync/process4.png",
	"/images/sync/process5.png",
];

export const modalIllustrations = [
	"/images/sync/modal-process-1.png",
	"/images/sync/modal-process-2.png",
	"/images/sync/modal-process-3.png",
	"/images/sync/modal-process-4.png",
	"/images/sync/modal-process-5.png",
];

export function getScenes(): SceneConfig[] {
	return [
		{
			id: "1",
			modalIllustration: modalIllustrations[0],
			illustration: <div />,
			description:
				"xSync is a function that helps you sync all your social media content onto Crossbell, where your data belongs to\nY❤️U.",
		},
		{
			id: "2",
			modalIllustration: modalIllustrations[1],
			illustration: (
				<div className="absolute left-2vw top-1/2 transform -translate-y-1/2">
					<Image
						src={illustrations[1]}
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
			modalIllustration: modalIllustrations[2],
			illustration: (
				<div className="absolute left-2vw top-1/2 transform -translate-y-1/2">
					<Image
						src={illustrations[2]}
						className="object-contain"
						placeholder="empty"
						width={309.1}
						height={232.1}
					/>
				</div>
			),
			description:
				"Select the desired platforms you wish to bind. You can always unbind your platform at any time.",
		},
		{
			id: "4",
			modalIllustration: modalIllustrations[3],
			illustration: (
				<div className="absolute left-2vw top-1/2 transform -translate-y-1/2">
					<Image
						src={illustrations[3]}
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
			modalIllustration: modalIllustrations[4],
			illustration: (
				<div className="absolute left-2vw top-1/2 transform -translate-y-1/2">
					<Image
						src={illustrations[4]}
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
