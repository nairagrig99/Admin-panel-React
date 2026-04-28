import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./User/userSlice.ts";
import popupSlice from "./popupSlice.ts";
import transactionSlice from "./Transaction/transactionSlice.ts"

export const coreStore = configureStore({
    reducer: {
        user: userSlice,
        popup: popupSlice,
        transaction: transactionSlice
    }
})

export type RootState = ReturnType<typeof coreStore.getState>
export type AppDispatch = typeof coreStore.dispatch;