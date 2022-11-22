import { withMultipleProviders } from "../../utils";

import { ScenesStoreProvider } from "./scenes-store";

export const StoresProvider = withMultipleProviders(ScenesStoreProvider);
