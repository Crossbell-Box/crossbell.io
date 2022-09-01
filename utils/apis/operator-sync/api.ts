import config from "config";
import { SupportedPlatform } from "./consts";

export default class OperatorSyncApi {
	public endpoint: string;

	constructor(endpoint?: string) {
		if (endpoint) {
			this.endpoint = endpoint;
		} else {
			this.endpoint = config.operatorSync.endpoint;
		}
	}

	async isCharacterActivated(characterId: number): Promise<boolean> {
		const res = (await fetch(`${this.endpoint}/${characterId}`).then((res) =>
			res.json()
		)) as OperatorSyncServerResponse<Character>;

		const isActivate =
			res.result?.crossbell_character_id === characterId?.toString();

		return isActivate;
	}

	async activateCharacter(characterId: number): Promise<boolean> {
		const res = (await fetch(`${this.endpoint}/${characterId}`, {
			method: "POST",
		}).then((res) => res.json())) as OperatorSyncServerResponse<Character>;

		const isActivate =
			res.result?.crossbell_character_id === characterId?.toString();

		return isActivate;
	}

	async getBoundAccounts(
		characterId: number
	): Promise<OperatorSyncServerResponse<Account[]>> {
		const res = await fetch(`${this.endpoint}/${characterId}/account`).then(
			(res) => res.json()
		);

		return res;
	}

	async bindAccount(
		characterId: number,
		platform: SupportedPlatform,
		username: string,
		startTime?: string
	): Promise<OperatorSyncServerResponse<boolean>> {
		const url = new URL(
			`${this.endpoint}/${characterId}/account/bind/${platform}/${username}`
		);
		if (startTime) {
			// Should be in RFC3339 format
			url.searchParams.append("from", startTime);
		}
		const res = (await fetch(url, {
			method: "POST",
		}).then((res) => res.json())) as OperatorSyncServerResponse<boolean>;

		if (!(res.ok && res.result)) {
			throw res;
		}

		return res;
	}

	async unbindAccount(
		characterId: number,
		platform: SupportedPlatform,
		username: string
	) {
		const res = (await fetch(
			`${this.endpoint}/${characterId}/account/unbind/${platform}/${username}`,
			{ method: "DELETE" }
		).then((res) => res.json())) as OperatorSyncServerResponse<boolean>;

		if (!(res.ok && res.result)) {
			throw res;
		}

		return res;
	}

	async getCharacterMediaUsage(characterId: number): Promise<number> {
		const accounts = await this.getBoundAccounts(characterId);
		let total = 0;
		accounts.result.forEach((account) => {
			account.media_usage.forEach((media) => {
				total += media.usage;
			});
		});
		return total;
	}

	async syncAccount(
		characterId: number,
		platform: SupportedPlatform,
		username: string
	): Promise<OperatorSyncServerResponse<Account>> {
		const res = (await fetch(
			`${this.endpoint}/${characterId}/account/sync/${platform}/${username}`,
			{ method: "POST" }
		).then((res) => res.json())) as OperatorSyncServerResponse<Account>;

		if (!(res.ok && res.result)) {
			throw res;
		}

		return res;
	}
}

// types

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
	result: never;
}

type OperatorSyncServerResponse<T> = SucceedResponse<T> | FailResponse;

interface Character {
	crossbell_character_id: string;
}

interface MediaUsage {
	content_type: string;
	usage: number; // In Bytes
}

interface Account {
	// Metadata
	crossbell_character_id: string;
	platform: SupportedPlatform;
	username: string;
	feeds_count: number;
	notes_count: number;
	media_usage: MediaUsage[];

	// OPSync status
	is_onchain_paused: boolean;
	/** time */
	onchain_paused_at: string;
	onchain_pause_message: string;

	/** time */
	last_updated: string;
	/** time */
	next_update: string;
	/** in seconds */
	update_interval: number;
}
