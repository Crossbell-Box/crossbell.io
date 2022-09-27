export enum AchievementLevelStatus {
	unableToMint = "unable-to-mint",
	ableToMint = "able-to-mint",
	minted = "minted",
}

export type AchievementLevel = {
	id: number;
	img: string;
	description: string;
	unitDesc: string;
	progressDesc: string;
	mintId: number | null;
	mintedCount: number;
	mintedAt: string | null;
	status: AchievementLevelStatus;
	contractAddress: string;
	ownerHandle: string;
	transactionHash: string | null;
};

export type AchievementInfo = {
	id: string;
	title: string;
	levels: AchievementLevel[];
};

export type AchievementGroup = {
	id: string;
	title: string;
	achievements: AchievementInfo[];
};

export enum AchievementsStatus {
	empty = "empty",
	emptyButAbleToMint = "emptyButAbleToMint",
	haveAchievements = "haveAchievements",
}
