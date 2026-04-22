import SideBar from "../components/Layout/LeftSidemenu/SideBar.tsx";
import MainLayout from "../components/Layout/MainLayout.tsx";

export default function MainPage() {
    return <div className="flex h-screen">
        <SideBar/>
        <MainLayout/>
    </div>
}
