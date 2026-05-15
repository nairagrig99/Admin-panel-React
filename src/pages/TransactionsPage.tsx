import Transaction from "../components/Layout/Transaction/Transaction.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../Store/store.ts";
import {useEffect} from "react";
import {sortTransaction} from "../Store/Transaction/ApiThunkTransaction.ts";
import {LIMIT} from "../constants/constant.ts";
import {AmountStatus} from "../Enums/amount-status.ts";
import useTransactionRequest from "../Hooks/useTransactionRequest.ts";

export default function TransactionsPage() {

    const dispatch = useDispatch<AppDispatch>();
    const getTransaction = useTransactionRequest();

    useEffect(() => {
        dispatch(sortTransaction(getTransaction()))
    }, []);

    return <Transaction/>
}