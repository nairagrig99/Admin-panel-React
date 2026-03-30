export type ButtonType = {
    value: string;
    className?:string,
}

export default function Button({value,className}: ButtonType) {
    return <button className={className}>{value}</button>
}