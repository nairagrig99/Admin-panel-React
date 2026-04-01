export type ButtonType = {
    value: string;
    type: "submit" | "reset" | "button" | undefined;
    className?: string,
}

export default function Button({value, type, className}: ButtonType) {
    return <button type={type} className={className}>{value}</button>
}