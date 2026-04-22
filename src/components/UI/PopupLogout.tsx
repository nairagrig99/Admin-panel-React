import Button from "./Button.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../Store/store.ts";
import {closePopup} from "../../Store/popupSlice.ts";
import {updateUser} from "../../Store/User/ApiThunk.ts";
import {useNavigate} from "react-router-dom";

export default function PopupLogout() {

    const dispatch = useDispatch<AppDispatch>();
    const selector = useSelector((state: RootState) => state.user.loggedUser);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(updateUser({
            id: selector.id,
            key: 'isLogged',
            value: false
        })).then((response) => {
            if (response.meta.requestStatus === 'fulfilled') {
                dispatch(closePopup())
                navigate('/auth/login');
            }
        })
    }
    const handlePopup = () => {
        dispatch(closePopup());
    }

    return <div className="w-72 h-fit bg-black">
        <div className="flex flex-col gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          items-center justify-center w-[320px] h-[150px] bg-white text-black z-20">
            <h3>Are you sure you want logout ?</h3>
            <div className="flex gap-2">
                <Button type="button" onClick={handleLogout} value="Yes"
                        className="bg-green-600 px-5 py-1 rounded-lg text-white"/>
                <Button type="button" onClick={handlePopup} value="No"
                        className="bg-[#808c8b] px-5 py-1 rounded-lg text-white"/>
            </div>
        </div>
    </div>
}