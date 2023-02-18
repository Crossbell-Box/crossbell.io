import { create } from "zustand";

import { modalSlice } from "../../../utils";

export const useWalletClaimCSBModal = create(modalSlice);
