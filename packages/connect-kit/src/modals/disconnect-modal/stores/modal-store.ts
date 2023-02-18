import { create } from "zustand";

import { modalSlice } from "../../../utils";

export const useDisconnectModal = create(modalSlice);
