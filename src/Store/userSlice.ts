import {createSlice} from "@reduxjs/toolkit";
import {getUser, registerUser, updateUser} from "./userActions.ts";
import type {UserInterface} from "../Model/user-interface.ts";

const UserState: UserInterface[] = [{
    id: "",
    first_name: "",
    last_name: "",
    birthOfDay: null,
    gender: "",
    mobileOrEmail: "",
    password: "",
    isLogged: false
}]

const INITIAL_STATE = {
    user: UserState,
    loggedUser: undefined,
    isLoading: false,
    error: null,
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState: INITIAL_STATE,
    reducers: {
        logOut: (state) => {
            state.user = UserState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.user.push(action.payload)
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
                state.error = null
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload
                state.loggedUser = state.user.find((user) => user.isLogged)
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
                state.error = null
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const {id, key, value} = action.meta.arg
                const index = state.user.findIndex((user) => user.id === id);
                state.user[index][key] = value;
                state.loggedUser = state.user[index]
            })

    }
})

export const {logOut} = userSlice.actions;
export default userSlice.reducer;