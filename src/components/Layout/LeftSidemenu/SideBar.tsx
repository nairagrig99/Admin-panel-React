import NavBar from "./NavBar.tsx";
import UserCard from "./UserCard.tsx";
import MobileMenuTicket from "./MobileMenuTicket.tsx";
import {useEffect, useState} from "react";
import useWindowSize from "../../../Hooks/useWindowSize.ts";

export default function SideBar() {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {width} = useWindowSize()

    useEffect(() => {
        setIsOpen(width);
    }, [width]);

    return <div
        className={`absolute sm:relative bg-[#212121] h-screen transition-all duration-300 flex flex-col
        ${isOpen ? 'w-10' : 'w-full  z-20 sm:w-64 sm:z-0'}`}>
        <MobileMenuTicket isOpen={isOpen} setIsOpen={setIsOpen}/>
        <div className={`flex flex-col justify-between h-full p-5 ${isOpen ? 'hidden' : 'visible'}`}>
            <NavBar/>
            <UserCard/>
        </div>
    </div>
}