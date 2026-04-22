import type {InputType} from "../../Model/input-type.ts";
import {memo} from "react";
import {ErrorMessage} from "./ErrorMessage.tsx";

const Input = memo(({errorMessage, ...props}: InputType) => {
    return <div className="flex flex-col">
        <input  {...props} />
        <ErrorMessage message={errorMessage}/>
    </div>
})
export default Input