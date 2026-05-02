import {memo, useEffect, useState} from "react";
import {sortTransaction} from "../../Store/Transaction/ApiThunkTransaction.ts";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../../Store/store.ts";
import useTransactionRequest from "../../Hooks/useTransactionRequest.ts";
import {setSearchBy} from "../../Store/Transaction/transactionSlice.ts";


const Search = memo(() => {
    const [search, setSearch] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const getTransaction = useTransactionRequest()

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
        dispatch(setSearchBy(value));
    }

    useEffect(() => {
        dispatch(sortTransaction(getTransaction()));
    }, [search]);

    return <input type="search"
                  value={search}
                  onChange={handleSearch}
                  className="bg-[#0F1F1F] w-[500px] rounded-lg px-2 py-1 max-w-full"
                  placeholder="Search transaction"
    />
})
export default Search