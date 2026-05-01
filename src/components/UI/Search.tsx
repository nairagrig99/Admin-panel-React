import {memo, useState} from "react";
import {sortTransaction} from "../../Store/Transaction/ApiThunkTransaction.ts";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../Store/store.ts";
import {LIMIT} from "../../constants/constant.ts";

const Search = memo(() => {
    const [search, setSearch] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const select = useSelector((state: RootState) => state.user.loggedUser);
    const transaction = useSelector((state: RootState) => state.transaction.sortBy);
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        dispatch(sortTransaction({
            start: 1,
            end: LIMIT,
            id: select.id,
            searchQuery: e.target.value,
            sortBy: transaction
        }))
    }


    return <input type="search"
                  value={search}
                  onChange={handleSearch}
                  className="bg-[#0F1F1F] w-[500px] rounded-lg px-2 py-1 max-w-full"
                  placeholder="Search transaction"
    />
})
export default Search