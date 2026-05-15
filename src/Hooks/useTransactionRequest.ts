import {LIMIT} from "../constants/constant.ts";
import {useSelector} from "react-redux";
import type {RootState} from "../Store/store.ts";

export default function useTransactionRequest() {

    const user = useSelector((state: RootState) => state.user.loggedUser);
    const sortBy = useSelector((state: RootState) => state.transaction.sortBy);
    const selectedPage = useSelector((state: RootState) => state.transaction.selectedPage);
    const searchQuery = useSelector((state: RootState) => state.transaction.search);


    return () => {
        return {
            start: selectedPage,
            end: LIMIT,
            id: user.id,
            searchQuery: searchQuery,
            sortBy: sortBy
        }
    }
}