import create from "zustand";

import { modalSlice } from "../../../utils";

export const useSelectCharactersModal = create(modalSlice);
