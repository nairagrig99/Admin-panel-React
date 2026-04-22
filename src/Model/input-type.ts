export type InputType = {
    value?: string | number,
    onBlur?: (e:React.ChangeEvent<HTMLInputElement>) => void,
    errorMessage?: string,
    placeholder?: string,
    name?: string,
    id?: string,
    type: string,
    className?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}