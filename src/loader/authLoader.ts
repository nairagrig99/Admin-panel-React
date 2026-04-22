import {URL} from "../constants/constant.ts";
import type {UserInterface} from "../Model/user-interface.ts";
import {redirect} from "react-router-dom";

async function getIsLogged() {
    const response = await fetch(URL);
    const user = await response.json();
    return user.some((u: UserInterface) => u.isLogged);
}

export async function protectedLoader() {
    const isLogged = await getIsLogged();
    if (!isLogged) {
        return redirect("/auth/login");
    }
    return null
}

export async function loginLoader() {
    const isLogged = await getIsLogged();
    if (isLogged) {
        return redirect("/dashboard")
    }
    return null;
}