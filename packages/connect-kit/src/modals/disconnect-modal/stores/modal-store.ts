import create from "zustand";

import { modalSlice } from "../../../utils";

export const useModalStore = create(modalSlice);
