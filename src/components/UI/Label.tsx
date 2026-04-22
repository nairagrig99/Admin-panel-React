import type {PropsType} from "../../Model/props-type.ts";

export type LabelProps = {
    label: string,
    labelClass?: string
}

type combine = LabelProps & PropsType
export default function Label({label, children, labelClass}: combine) {
    return <label className={labelClass}>
        <span className="mb-[5px]"> {label}</span>
        {children}
    </label>
}