import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorsTypes } from 'libs/types';

interface InitialTypes {
    errors: ErrorsTypes;
    showMessage: boolean;
}
const initialState: InitialTypes = {
    errors: {
        status: 200,
        ok: true,
        statusText: "",
        type:""
    },
    showMessage: false
}

const errorsSlicer = createSlice({
    name: "errors",
    initialState,
    reducers: {
        setErrors(state, actions: PayloadAction<InitialTypes>) { 
            state.errors = actions.payload.errors;
            state.showMessage = actions.payload.showMessage;
        },
        clearErrors(state) {
            state.errors = {
                ok: true,
                status: 200,
                statusText: "",
                type:""
            };
            state.showMessage = false;
        }
    }
});

export const { setErrors, clearErrors } = errorsSlicer.actions;
export default errorsSlicer.reducer;