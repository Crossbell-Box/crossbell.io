import create from "zustand";

import { modalSlice } from "../../../utils/store/modal-slice";

export const useModalStore = create(modalSlice);
