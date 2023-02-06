import create from "zustand";

import { modalSlice } from "../../../utils";

export const useWalletMintNewCharacterModal = create(modalSlice);
