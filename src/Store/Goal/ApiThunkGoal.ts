import {createAsyncThunk} from "@reduxjs/toolkit";
import {ERROR_MSG, URL_GOALS} from "../../constants/constant.ts";
import {ErrorHelper} from "../../utils/errorHelper.ts";
import type {EditTransaction} from "../../Model/edit-transaction-type.ts";
import {GoalStatus} from "../../Enums/goal-status.ts";

export const ApiThunkGoal = createAsyncThunk(
    'add/Goal',
    async (goal, {rejectWithValue}) => {
        try {
            const request = await fetch(URL_GOALS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(goal)
            });

            return await ApiThunk(request)
        } catch (e) {
            return rejectWithValue(e);
        }

    }
)

export const ApiThunkGetGoals = createAsyncThunk(
    'get/Goal',
    async (_, {rejectWithValue}) => {
        try {
            const request = await fetch(URL_GOALS, {method: 'GET'});
            return await ApiThunk(request)
        } catch (e) {
            return rejectWithValue(e);
        }

    }
)
export const ApiThunkDeleteGoals = createAsyncThunk(
    'delete/Goal',
    async (id: number, {rejectWithValue}) => {
        try {
            const request = await fetch(`${URL_GOALS}/${id}`, {method: 'DELETE'});
            await ApiThunk(request)
            return {id: id}
        } catch (e) {
            return rejectWithValue(e)
        }

    }
)

export const ApiThunkEditGoals = createAsyncThunk(
    'edit/Goal',
    async (data: EditTransaction, {rejectWithValue}) => {
        try {
            const request = await fetch(`${URL_GOALS}/${data.id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data.data)
                }
            );
            const response = await ApiThunk(request)
            return {id: data.id, data: response}
        } catch (e) {
            return rejectWithValue(e)
        }

    }
)

type GoalSortType = {
    id: 0,
    params: GoalStatus
}

export const ApiThunkSortGoal = createAsyncThunk(
    'sort/Goals',
    async (sortBy: GoalSortType, {rejectWithValue}) => {
        try {

            const queryParams = new URLSearchParams({
                userId: sortBy.id
            });

            if (sortBy.params !== GoalStatus.ALL_GOALS) {
                queryParams.append('goalStatus', sortBy.params)
            }

            const response = await fetch(`${URL_GOALS}?${queryParams.toString()}`)
            return await ApiThunk(response)
        } catch (e) {
            return rejectWithValue(e);
        }

    }
)

async function ApiThunk<T>(request: Response): Promise<T> {
    if (!request.ok) {
        ErrorHelper(ERROR_MSG)
    }

    return await request.json();
}