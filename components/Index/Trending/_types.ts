export type TrendingCharacter = {
  crossbell_id: number;
  handle: string;
  avatar: string;
  name: string;
  bio: string;
  banner: string;

  list_id: number;
}

export type TrendingTreasure = {
  character_id: number;
  character_name: string;
  character_handle: string;
  character_avatar: string;

  crossbell_id: number;
  media: string;
  text: string;
  mint_count: number;
}

export type TrendingList = {
  id: number;
  intro: string;
  start_icon: string;
}

export type TrendingRawData = {
  character: TrendingCharacter[];
  treasure: TrendingTreasure[];
  list: TrendingList[];
}
