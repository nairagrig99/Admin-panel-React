import Transaction from "../components/Layout/Transaction/Transaction.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../Store/store.ts";
import {useEffect} from "react";
import {getTransaction} from "../Store/Transaction/ApiThunkTransaction.ts";
import {LIMIT} from "../constants/constant.ts";

export default function TransactionsPage() {
    const dispatch = useDispatch<AppDispatch>();
    const select = useSelector((state: RootState) => state.user.loggedUser);

    useEffect(() => {
        if (select.id) {
            dispatch(getTransaction({start: 1, end: LIMIT, id:select.id}))
        }

    }, [select]);

    return <Transaction/>
}