import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./userSlice.ts";

export const coreStore = configureStore({
    reducer: {
        user: userSlice
    }
})

export type RootState = ReturnType<typeof coreStore.getState>
export type AppDispatch = typeof coreStore.dispatch;