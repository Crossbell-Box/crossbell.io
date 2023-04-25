import { withMultipleProviders } from "@crossbell/react-account/utils";

import { ScenesStoreProvider } from "./scenes-store";

export const StoresProvider = withMultipleProviders(ScenesStoreProvider);
