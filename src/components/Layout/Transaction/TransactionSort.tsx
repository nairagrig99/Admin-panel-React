import Button from "../../UI/Button.tsx";
import {useEffect, useState} from "react";
import {AmountStatus} from "../../../Enums/amount-status.ts";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../../../Store/store.ts";
import {sortTransaction} from "../../../Store/Transaction/ApiThunkTransaction.ts";

import useTransactionRequest from "../../../Hooks/useTransactionRequest.ts";
import {setSortBy} from "../../../Store/Transaction/transactionSlice.ts";

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
        console.log("selected", selected)
        dispatch(sortTransaction(getTransaction()))
    }, [selected]);

    return <div className="flex bg-[#68C6C6] py-[2px] rounded-[7px]  justify-evenly w-[194px]">
        {
            sortButtons.map((btn) => (
                <Button type='button'
                        key={btn}
                        className={` ${selected === btn ? 'bg-[#37A6A6]' : 'bg-transparent'} px-2 py-1 rounded capitalize`}
                        onClick={() => handleSort(btn)}>{btn}</Button>
            ))
        }
    </div>
}