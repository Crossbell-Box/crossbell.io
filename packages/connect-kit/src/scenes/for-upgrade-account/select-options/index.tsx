import React from "react";

import { createLazyDynamicScene } from "../../../components";

export const SelectOptions = createLazyDynamicScene(
	React.lazy(() => import("./lazy")),
);
