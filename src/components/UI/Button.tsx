import {forwardRef, type ReactNode} from "react";

export type ButtonType = {
    value?: string;
    name?:string,
    type: "submit" | "reset" | "button" | undefined;
    className?: string,
    onClick?: () => void,
    children?: ReactNode;
}

const Button = forwardRef(({name,value, type, className, onClick, children}: ButtonType, ref) => {

    return <button ref={ref} name={name} type={type} onClick={onClick} className={className}
                   value={value}>{children ? children : value}</button>
})
export default Button