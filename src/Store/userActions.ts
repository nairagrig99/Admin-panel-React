import {createAsyncThunk} from "@reduxjs/toolkit";
import {URL} from "../constants/constant.ts";
import type {UserInterface} from "../Model/user-interface.ts";

export const registerUser = createAsyncThunk(
    'user/register',
    async (userDate: UserInterface, {rejectWithValue}) => {
        try {
            const response = await fetch(`${URL}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(userDate)
            })
            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.message || 'Registration failed');
            }
            return data

        } catch (err) {
            return rejectWithValue(err.message);
        }

    }
)