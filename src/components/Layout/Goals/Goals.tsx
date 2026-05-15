import ActionsHeader from "./ActionsHeader.tsx";
import GoalList from "./GoalList.tsx";
import {useEffect} from "react";
import {ApiThunkGetGoals} from "../../../Store/Goal/ApiThunkGoal.ts";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../../../Store/store.ts";

export default function Goals() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(ApiThunkGetGoals())
    }, [dispatch]);

    return <>
        <ActionsHeader/>
        <GoalList/>
    </>
}