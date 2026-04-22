import UserNameWithPicture from "./UserNameWithPicture.tsx";
import LogoutSvg from "../../UI/LogoutSvg.tsx";
import PopupLogout from "../../UI/PopupLogout.tsx";
import Popup from "../../UI/Popup.tsx";
import {useState} from "react";

export default function UserCard() {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return <div
        className="bg-[#0F1F1F] text-white flex flex-col gap-2 w-full h-fit rounded-[8px] p-2  bottom-[20px] right-0">
        <div className="">User Profile</div>
        <UserNameWithPicture/>
        <div className="flex gap-4 cursor-pointer" onClick={() => setIsOpen(true)}>
            <LogoutSvg/>
            <p>Logout</p>
        </div>
        <Popup isOpen={isOpen}>
            <PopupLogout/>
        </Popup>
    </div>
}