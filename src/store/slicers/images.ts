import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ImagesFiltersTypes, ImageTypes } from "libs/types";


interface InitialState {
    images: ImageTypes[];
    selector_images: ImageTypes[];
    images_count: number;
    filters: ImagesFiltersTypes;
}

const initialState: InitialState = {
    images: [],
    selector_images: [],
    images_count: 0,
    filters: {
        page: 1,
        category: "all",
        query: "",
        limit: 50,
        order: "-id"
    },
}
const imagesSlicer = createSlice({
    name: 'images',
    initialState,
    reducers: {
        setImages(state, actions: PayloadAction<{ images: ImageTypes[], images_count: number }>) {
            state.images = actions.payload.images;
            state.images_count = actions.payload.images_count;
            state.selector_images = actions.payload.images;
        },
        resetImagesFilters(state) {
            state.filters.category = 'all';
            state.filters.order = '-id';
            state.filters.query = '';
            state.filters.page = 1;
            state.filters.limit = 50;
        },
        setImagesFilters(state, actions: PayloadAction<{ key: any, value: string | number | boolean }>) {
            function changeParams<T extends keyof ImagesFiltersTypes>(key: T, value: ImagesFiltersTypes[T]) {
                state.filters[key] = value;
            };
            changeParams(actions.payload.key, actions.payload.value);
        },
        setImagesFiltersTest(state, actions: PayloadAction<ImagesFiltersTypes>) {
            state.filters = actions.payload;
        }
    }
});

export const { resetImagesFilters, setImages, setImagesFilters, setImagesFiltersTest } = imagesSlicer.actions;
export default imagesSlicer.reducer;