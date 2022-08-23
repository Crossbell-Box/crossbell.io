interface BaseResponse {
  ok: boolean;
  message: string;
}

interface SucceedResponse<T> extends BaseResponse {
  // ok is true
  result: T;
}
interface FailResponse extends BaseResponse {
  // ok is false
}

export type OperatorSyncServerResponse<T> = SucceedResponse<T> | FailResponse;

export interface Character {
  crossbell_character_id: string;
}

export interface MediaUsage {
  content_type: string;
  usage: number; // In Bytes
}

export interface Account {
  // Metadata
  crossbell_character_id: string;
  platform: string;
  username: string;
  feeds_count: number;
  notes_count: number;
  media_usage: MediaUsage[];

  // OPSync status
  is_onchain_paused: boolean;
  onchain_paused_at: string; // Time
  onchain_pause_message: string;
}
