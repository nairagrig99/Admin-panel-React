import {NavLink} from "react-router-dom";
import {router} from "../../../main.tsx";
import NavIcon from "./NavIcon.tsx";
import logo from '../../../assets/Logo.png';

export default function NavBar() {
    const mainRoute = router["routes"][0]["children"];
    const splitSlash = (str: string) => {
        if (!str) return
        return str.slice(0, str.length)
    }

    return <div>
        <img src={logo}/>
        <nav className="flex flex-col text-white gap-2">
            {mainRoute?.map((route) => (route.path && (
                <div className="flex gap-2 items-center capitalize" key={route.path}>
                    <NavIcon icon={splitSlash(route.path)}/>
                    <NavLink to={route.path}>{splitSlash(route.path)}</NavLink>
                </div>
            )))}
        </nav>
    </div>
}