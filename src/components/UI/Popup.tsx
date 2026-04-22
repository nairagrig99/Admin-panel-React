import {createPortal} from "react-dom";
import {type ReactNode} from "react";

export default function Popup({isOpen = false, children}: { isOpen: boolean, children: ReactNode }) {

    if (!isOpen) return null

    return createPortal(
        <div className='absolute inset-0 bg-[#b49f9f] bg-white/50'>
            {children}
        </div>,
        document.querySelector('#modal')!)
}