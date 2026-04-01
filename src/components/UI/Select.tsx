import type {SelectProps} from "../../Model/SelectProps.ts";

export default function Select({value, onChange, options, name, onBlur, placeholder,className}: SelectProps) {
    return <select
        name={name}
        value={value}
        onBlur={onBlur}
        className={className}
        onChange={(e) => onChange(e.target.value)}
    >
        <option value="" disabled className="text-black"> {placeholder} </option>
        {options.map((val) =>
            <option className="text-black" key={val.value} value={val.value}>{val.value}</option>
        )}
    </select>
}