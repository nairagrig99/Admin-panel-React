import {useDispatch} from "react-redux";
import type {AppDispatch} from "../Store/store.ts";
import {useEffect} from "react";
import {getUser} from "../Store/userActions.ts";
import SideBar from "../components/Layout/SideBar.tsx";
import MainLayout from "../components/Layout/MainLayout.tsx";

export default function MainPage() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getUser())
    }, []);

    return <div className="flex">
        <SideBar/>
        <MainLayout/>
    </div>
}