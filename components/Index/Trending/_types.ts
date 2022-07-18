export type TrendingCharacter = {
  crossbell_id: number;
  handle: string;
  avatar: string;
  name: string;
  bio: string;
  banner: string;
}

export type TrendingTreasure = {
  character_name: string;
  character_handle: string;
  character_avatar: string;

  crossbell_id: string;
  media: string;
  text: string;
  mint_count: number;
}

export type TrendingList = {
  intro: string;
  start_icon: string;
}
