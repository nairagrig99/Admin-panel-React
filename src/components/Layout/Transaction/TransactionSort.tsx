import Button from "../../UI/Button.tsx";
import {useEffect, useState} from "react";
import {AmountStatus} from "../../../Enums/amount-status.ts";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../../../Store/store.ts";
import {sortTransaction} from "../../../Store/Transaction/ApiThunkTransaction.ts";

import useTransactionRequest from "../../../Hooks/useTransactionRequest.ts";
import {setSortBy} from "../../../Store/Transaction/transactionSlice.ts";
import FilterButtonGroup from "../../UI/FilterButtonGroup.tsx";

export default function TransactionSort() {
    const [selected, setSelected] = useState<AmountStatus>(AmountStatus.ALL);
    const dispatch = useDispatch<AppDispatch>();
    const getTransaction = useTransactionRequest()

    const sortButtons = Object.values(AmountStatus);
    const handleSort = (sortType: AmountStatus) => {
        dispatch(setSortBy(sortType))
        setSelected(sortType)
    };

    useEffect(() => {
        dispatch(sortTransaction(getTransaction()))
    }, [selected]);

    return <FilterButtonGroup sortButtons={sortButtons} handleSort={handleSort} selected={selected}/>
}