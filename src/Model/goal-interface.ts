import type {GoalStatus} from "../Enums/goal-status.ts";

type IDs = {
    userId: number,
    id: number
}

export type GoalType = {
    goalName: string,
    targetAmount: string,
    initialSavings: string,
    goalStatus?: GoalStatus,
    iconImg: string,
    date: string
}

export type GoalModel = IDs & GoalType