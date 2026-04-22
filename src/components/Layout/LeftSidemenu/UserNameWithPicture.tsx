import type {UserInterface} from "../../../Model/user-interface.ts";
import {useSelector} from "react-redux";
import type {RootState} from "../../../Store/store.ts";
import {Link} from "react-router-dom";
import React from "react";

const UserNameWithPicture = React.memo(function UserNameWithPicture() {

    const user: UserInterface = useSelector((state: RootState) => state.user.loggedUser);
    if (!user) return null;
    const convertName = (firstName: string, lastName: string) => {
        return `${firstName.slice(0, 1)}  ${lastName.slice(0, 1)}`
    }

    return (
        <Link to='/Profile' className="flex gap-2.5 items-center">
            <div
                className="w-[40px] h-[40px] flex justify-center text-sm items-center border border-solid rounded-full">{convertName(user.first_name, user.last_name)}</div>
            <h3 className="flex gap-2 text-[14px]">{user.first_name} {user.last_name}</h3>
        </Link>
    )
})
export default UserNameWithPicture;

