import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../Store/store.ts";
import {setSortBy} from "../../../Store/Transaction/transactionSlice.ts";

import {GoalStatus} from "../../../Enums/goal-status.ts";
import FilterButtonGroup from "../../UI/FilterButtonGroup.tsx";
import {ApiThunkSortGoal} from "../../../Store/Goal/ApiThunkGoal.ts";

export default function GoalsSort() {
    const [selected, setSelected] = useState<GoalStatus>(GoalStatus.ALL_GOALS);
    const user = useSelector((state: RootState) => state.user.loggedUser);
    const dispatch = useDispatch<AppDispatch>();

    const sortButtons = Object.values(GoalStatus);
    const handleSort = (sortType: GoalStatus) => {
        dispatch(setSortBy(sortType))
        setSelected(sortType)
    };

    useEffect(() => {
        dispatch(ApiThunkSortGoal({id: user?.id, params: selected}));
    }, [selected]);

    return <FilterButtonGroup sortButtons={sortButtons}
                              handleSort={handleSort}
                              selected={selected}/>
}