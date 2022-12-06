import { withMultipleProviders } from "../../../utils";

import { EmailConnectStoreProvider } from "./email-connect-store";
import { EmailRegisterStoreProvider } from "./email-register-store";
import { ResetPasswordStoreProvider } from "./reset-password-store";
import { ScenesStoreProvider } from "./scenes-store";

export const StoresProvider = withMultipleProviders(
	ResetPasswordStoreProvider,
	EmailRegisterStoreProvider,
	EmailConnectStoreProvider,
	ScenesStoreProvider
);
