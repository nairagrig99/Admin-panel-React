import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getUser} from "../../Store/User/ApiThunk.ts";
import type {RootState} from "../../Store/store.ts";
import {Loader} from "../UI/Loader.tsx";

export const AuthWrapper = ({children}: { children: React.ReactNode }) => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);
    const loggedUser = useSelector((state: RootState) => state.user.loggedUser);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    if (!user && !loggedUser) {
        return <Loader/>;
    }

    return <>{children}</>;
}