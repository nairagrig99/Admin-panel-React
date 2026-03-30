import {createSlice} from "@reduxjs/toolkit";
import {registerUser} from "./userActions.ts";

const User = {
    first_name: "",
    last_name: "",
    birthOfDay: "",
    gender: "",
    mobileOrEmail: "",
    password: ""
}

const INITIAL_STATE = {
    user: User,
    isLoading: false,
    error: null,
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState: INITIAL_STATE,
    reducers: {
        logOut: (state) => {
            state.user = User;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    }
})

export const { logOut } = userSlice.actions;
export default userSlice.reducer;