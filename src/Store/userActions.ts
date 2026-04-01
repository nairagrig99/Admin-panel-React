import {createAsyncThunk} from "@reduxjs/toolkit";
import {URL} from "../constants/constant.ts";
import type {UserInterface} from "../Model/user-interface.ts";
import type {UpdateFieldInterface} from "../Model/update-field-interface.ts";

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
            // await new Promise((resolve) => setTimeout(resolve, 1000))

            return data

        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)
type AllowedUpdateValues = string | number | boolean | object | null;
export const updateUser = createAsyncThunk(
    'update/user',
    async (update: UpdateFieldInterface<AllowedUpdateValues>) => {
        const {id, key, value} = update;

        const response = await fetch(`${URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                [key]: value
            })
        })

        if (!response.ok) {
            throw new Error('Something went wrong')
        }

        // await new Promise((resolve) => setTimeout(resolve, 1000));

        return response.json()
    }
)
export const getUser = createAsyncThunk(
    'user/get',
    async () => {
        const response = await fetch(URL)
        if (!response.ok) {
            throw new Error("Something went wrong");
        }
        console.log("response.json()",await response.json())
        return await response.json()
    }
)