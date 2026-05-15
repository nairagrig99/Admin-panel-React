import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./User/userSlice.ts";
import popupSlice from "./popupSlice.ts";
import transactionSlice from "./Transaction/transactionSlice.ts"
import goalSlice from "./Goal/GoalSlice.ts";

export const coreStore = configureStore({
    reducer: {
        user: userSlice,
        popup: popupSlice,
        goals: goalSlice,
        transaction: transactionSlice
    }
})

export type RootState = ReturnType<typeof coreStore.getState>
export type AppDispatch = typeof coreStore.dispatch;