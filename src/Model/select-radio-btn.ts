import type {OptionProps} from "./select-props.ts";

export type SelectRadioBtnType = {
    values: OptionProps[],
    className: string,
    name: string
    selectedColor: string,
    setSelected: (e: React.ChangeEvent<HTMLButtonElement>) => void
}