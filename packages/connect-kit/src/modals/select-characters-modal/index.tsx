import React from "react";

import { createLazyModal } from "../../components";

import { useSelectCharactersModal } from "./stores";

export { useSelectCharactersModal };

export const SelectCharactersModal = createLazyModal(
	useSelectCharactersModal,
	React.lazy(() => import("./lazy"))
);
