import type {InputType} from "../../Model/input-type.ts";

export default function Input({...props}: InputType) {
    return <input  {...props} />
}