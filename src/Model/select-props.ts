export type SelectProps = {
    props: SelectType,
    options: OptionProps[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    placeholder?: string,
    errorMessage:string
}

export type SelectType = {
    value: string,
    name?: string;
    onBlur?: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    className?: string
}

export type OptionProps = {
    value: string | number
}