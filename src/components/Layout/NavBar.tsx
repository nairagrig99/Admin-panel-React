import {NavLink} from "react-router-dom";
import {router} from "../../main.tsx";

export default function NavBar() {

    const mainRoute = router["routes"][0]["children"];
    const splitSlash = (str: string) => {
        if (!str) return
        return str.slice(1, str.length)
    }

    return <>
        <nav className="flex flex-col text-white">
            {mainRoute?.map((route, index) => (
                <NavLink key={index} to={route.path}>{splitSlash(route.path)}</NavLink>
            ))}
        </nav>

    </>
}