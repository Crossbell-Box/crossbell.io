import React from "react";

import { createLazyDynamicScene } from "../../../../components";

export const EditCharacterProfile = createLazyDynamicScene(
	React.lazy(() => import("./lazy"))
);
