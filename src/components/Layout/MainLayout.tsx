import {Outlet} from "react-router-dom";
export default function MainLayout() {
    return <div className="flex-1 w-full  min-h-[600px] bg-[#171717] h-full text-white p-10">
        <Outlet/>
    </div>
}