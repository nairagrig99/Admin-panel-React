export type SelectProps = {
    options: OptionProps[];
    name?: string;
    onBlur:()=>void,
    onChange:()=>void,
    placeholder:string,
    className:string
}

export type OptionProps = {
    value: string | number
}