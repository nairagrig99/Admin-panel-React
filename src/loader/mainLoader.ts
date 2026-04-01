import {URL} from "../constants/constant.ts";
import {redirect} from "react-router-dom";

export async function mainLoader() {
    const response = await fetch(URL);

    if (!response.ok) throw new Error("Something went wrong");

    const user = await response.json();

    const isLoggedUser = user.length > 0 && user.some((us) => us.isLogged);

    if (!isLoggedUser) return redirect('/auth/login')

    return true;
}