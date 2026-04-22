import type {SelectProps} from "../../Model/select-props.ts";
import {memo} from "react";
import {ErrorMessage} from "./ErrorMessage.tsx";

const Select = memo(({errorMessage, options, onChange, placeholder, ...props}: SelectProps) => {
    return <div className="flex flex-col w-full">
        <select
            {...props}
            onChange={(e) => onChange(e)}
        >
            <option value="" disabled className="text-black"> {placeholder} </option>
            {options.map((val) =>
                <option className="text-black" key={val.value} value={val.value}>{val.value}</option>
            )}
        </select>
        <ErrorMessage message={errorMessage}/>
    </div>
})
export default Select