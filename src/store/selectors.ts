import { ErrorsTypes, } from "libs/types";
import type { RootState } from "./store";
import { ImagesInitialStateTypes } from "libs/types/images";


export const selectGlobal = (state: RootState) => state.global;

export const selectImages = (state: RootState): ImagesInitialStateTypes => state.images;

export const selectErrors = (state: RootState): { errors: ErrorsTypes, showMessage: boolean } => state.errors;





