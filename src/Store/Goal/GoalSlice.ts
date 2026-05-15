import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {
    ApiThunkDeleteGoals,
    ApiThunkEditGoals,
    ApiThunkGetGoals,
    ApiThunkGoal,
    ApiThunkSortGoal
} from "./ApiThunkGoal.ts";
import type {GoalModel} from "../../Model/goal-interface.ts";
import {GoalStatus} from "../../Enums/goal-status.ts";


const goalState: GoalModel[] = [{
    userId: 0,
    id: 0,
    goalName: '',
    goalStatus: GoalStatus.ALL_GOALS,
    targetAmount: '',
    initialSavings: '',
    iconImg: '',
    date: '',
}]

const goalInitialState = {
    goals: goalState,
    loader: false,
    error: ''
}

const goalSlice = createSlice({
    name: 'goal/Slice',
    initialState: goalInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(ApiThunkGoal.pending, (state) => {
            state.loader = true
            state.error = ''
        })
            .addCase(ApiThunkGoal.fulfilled, (state, action: PayloadAction<GoalModel>) => {
                state.loader = false
                state.error = ''
                state.goals.push(action.payload)
            })
            .addCase(ApiThunkGoal.rejected, (state, action: PayloadAction<{ error: string }>) => {
                state.loader = false
                state.error = action.payload.error
            })
            .addCase(ApiThunkGetGoals.pending, (state) => {
                state.loader = true
                state.error = ''
            })
            .addCase(ApiThunkGetGoals.fulfilled, (state, action: PayloadAction<GoalModel[]>) => {
                state.loader = false
                state.error = ''
                state.goals = action.payload
            })
            .addCase(ApiThunkGetGoals.rejected, (state, action: PayloadAction<{ error: string }>) => {
                state.loader = false
                state.error = action.payload.error
            })
            .addCase(ApiThunkDeleteGoals.pending, (state) => {
                state.loader = true;
                state.error = ''
            })
            .addCase(ApiThunkDeleteGoals.fulfilled, (state, action) => {
                const {id} = action.payload;
                const findInd = state.goals.findIndex((el) => el.id === id)
                if (findInd != -1) {
                    state.goals.splice(findInd, 1);
                    state.loader = false;
                }
            })
            .addCase(ApiThunkDeleteGoals.rejected, (state, action: PayloadAction<{ error: string }>) => {
                state.loader = false;
                state.error = action.payload.error
            })
            .addCase(ApiThunkEditGoals.pending, (state) => {
                state.loader = true;
                state.error = ''
            })
            .addCase(ApiThunkEditGoals.fulfilled, (state, action: PayloadAction<{ id: number, data: GoalModel }>) => {
                const {id, data} = action.payload;
                const findInd = state.goals.findIndex((el) => el.id === id)
                if (findInd != -1) {
                    state.goals[findInd] = data;
                    state.loader = false;
                }
            })
            .addCase(ApiThunkEditGoals.rejected, (state, action: PayloadAction<{ error: string }>) => {
                state.loader = false;
                state.error = action.payload.error
            })
            .addCase(ApiThunkSortGoal.pending, (state) => {
                state.loader = true;
            })
            .addCase(ApiThunkSortGoal.fulfilled, (state, action: PayloadAction<GoalModel[]>) => {
                state.loader = false;
                state.goals = action.payload;
            })
            .addCase(ApiThunkSortGoal.rejected, (state, action: PayloadAction<{ error: string }>) => {
                state.loader = false;
                state.error = action.payload.error
            })
    }
})

export default goalSlice.reducer