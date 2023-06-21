import React from "react";

import { createLazyDynamicScene } from "../../../../components";

export const MainSetting = createLazyDynamicScene(
	React.lazy(() => import("./lazy"))
);
