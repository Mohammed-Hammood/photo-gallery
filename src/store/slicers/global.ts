import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GlobalSettingsTypes } from 'libs/types';
 

const initialState: GlobalSettingsTypes = {
    scrollToTop: {
        isVisible:true
    },
    filters: {
        direction: "left",
    },
    search: {
        isVisible: false,
    },
    progressBar: {
        isVisible: true,
        backgroundColor: "red",
    },
    body: {
        fontFamily: "times new roman",
        backgroundColor: [255, 255, 255],
        opacity: 80,
    },
    header: {
        color: "white", 
        backgroundColor: "#457de8",
        opacity: 90,
        marginsColor: "#457de8",
    },
     
    footer: {
        color: "white",
        backgroundColor: "#457de8",
        opacity: 80,
        marginsColor: "#457de8",
    },

    controlPanel: {
        isVisible: true
    }
}
const globalSlicer = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setGlobalParams(state, actions: PayloadAction<{ param: any, key: any, value: string | number | boolean | number[] }>) {
            function setValues<P extends keyof GlobalSettingsTypes, K extends keyof GlobalSettingsTypes[P], V extends GlobalSettingsTypes[P][K]>(param: P, key: K, value: V) {
                state[param][key] = value;
            }
            setValues(actions.payload.param, actions.payload.key, actions.payload.value)
        },

    }
})

export const { setGlobalParams } = globalSlicer.actions
export default globalSlicer.reducer;