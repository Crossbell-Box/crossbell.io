import React from "react";

import { ContainerSize } from "./utils";

export type DynamicContainerContextType = (size: ContainerSize) => void;

export const DynamicContainerContext =
	React.createContext<DynamicContainerContextType>(() => {});
