import Button from "../../UI/Button.tsx";
import {useEffect, useState} from "react";
import {AmountStatus} from "../../../Enums/amount-status.ts";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../Store/store.ts";
import {sortTransaction} from "../../../Store/Transaction/ApiThunkTransaction.ts";
import {LIMIT} from "../../../constants/constant.ts";

export default function TransactionSort() {
    const [selected, setSelected] = useState<AmountStatus>(AmountStatus.ALL);
    const dispatch = useDispatch<AppDispatch>();
    const select = useSelector((user: RootState) => user.user.loggedUser);
    const sortButtons = Object.values(AmountStatus);
    const handleSort = (sortType: AmountStatus) => setSelected(sortType);

    useEffect(() => {
        if (selected) {
            const sort = {
                id: select.id,
                start: 1,
                end: LIMIT,
                sortBy: selected
            }

            dispatch(sortTransaction(sort))
        }
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