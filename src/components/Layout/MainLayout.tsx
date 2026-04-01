import {Outlet} from "react-router-dom";

export default function MainLayout() {
    return <div className="content w-[70%] bg-[#171717] h-screen text-white">
        <Outlet/>
    </div>
}