import type { RootState } from "./store";
import { ErrorsTypes,  ImagesInitialStateTypes } from "libs/types";


export const selectGlobal = (state: RootState) => state.global;

export const selectImages = (state: RootState): ImagesInitialStateTypes => state.images;

export const selectErrors = (state: RootState): { errors: ErrorsTypes, showMessage: boolean } => state.errors;





