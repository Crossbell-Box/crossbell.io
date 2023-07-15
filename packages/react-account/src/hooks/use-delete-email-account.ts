import { deleteAccount } from "../apis";
import { useAccountState } from "./account-state";
import { createAccountTypeBasedMutationHooks } from "./account-type-based-hooks";

export const useDeleteEmailAccount = createAccountTypeBasedMutationHooks(
	{
		actionDesc: "delete email account",
		withParams: false,
		connectType: "email",
	},
	() => {
		const { disconnectEmail } = useAccountState();

		return {
			async email(_, { account }) {
				await deleteAccount(account.token);
			},

			onSuccess: async () => disconnectEmail(),
		};
	},
);
