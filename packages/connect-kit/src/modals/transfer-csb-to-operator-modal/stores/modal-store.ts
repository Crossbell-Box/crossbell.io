import { create } from "zustand";

import { modalSlice } from "../../../utils";

export const useTransferCSBToOperatorModal = create(modalSlice);
