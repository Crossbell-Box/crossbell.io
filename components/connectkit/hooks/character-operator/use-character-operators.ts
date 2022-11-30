import { OPERATOR_ADDRESS } from "@/utils/apis/operator-sync";

import { useAccountState } from "../account-state";


export function useCharacterOperators() {
	return useAccountState((s) => {
		const operators: string[] =
			(s.computed.account?.character as any)?.operators ?? [];

		if (s.email) {
			// Email account have OPERATOR by default.
			return [OPERATOR_ADDRESS];
		} else {
			return operators;
		}
	});
}
