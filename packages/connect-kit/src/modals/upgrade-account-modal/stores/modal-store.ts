import create from "zustand";

import { modalSlice } from "../../../utils";

export const useUpgradeAccountModal = create(modalSlice);
