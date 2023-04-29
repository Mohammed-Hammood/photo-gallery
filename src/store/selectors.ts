import type { RootState } from "./store";
import { ErrorsTypes, ImageTypes, ImagesInitialStateTypes } from "libs/types";


export const selectGlobal = (state: RootState) => state.global;

export const selectImages = (state: RootState): ImagesInitialStateTypes => state.images;

export const selectErrors = (state: RootState): { errors: ErrorsTypes, showMessage: boolean } => state.errors;


export const selectImagesByFilters = (state: RootState): ImageTypes[] => state.images.images
    .filter(item => item.allowed_users === 'all')
    .filter(item => state.images.filters.category === 'all' || item.category === state.images.filters.category)
    .filter(item => state.images.filters.query.trim().length === 0 ||
        item.title.includes(state.images.filters.query.trim()) ||
        item.description?.includes(state.images.filters.query.trim())
        || item.tags.some(tag => tag.title.includes(state.images.filters.query.trim()))).sort((a, b) => state.images.filters.order === '-id' ? a.id - b.id : b.id - a.id)