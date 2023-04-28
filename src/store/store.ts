import { configureStore } from '@reduxjs/toolkit';
import globalSlicer from './slicers/global'
import errorsSlicer from './slicers/errors'
import imagesSlicer from './slicers/images';


export const store = configureStore({
    reducer:{
        global:globalSlicer,
        images:imagesSlicer,
        errors:errorsSlicer,
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
