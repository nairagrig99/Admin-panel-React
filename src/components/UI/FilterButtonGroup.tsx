import Button from "./Button.tsx";

interface FilterButtonGroupProps<T extends string> {
    sortButtons: T[] | readonly T[];
    selected: T;
    handleSort: (value: T) => void;
}

export default function FilterButtonGroup<T extends string>({
                                                                sortButtons,
                                                                selected,
                                                                handleSort
                                                            }: FilterButtonGroupProps<T>) {
    return <div className="flex bg-[#68C6C6] w-fit py-[2px] rounded-[7px]  justify-evenly">
        {
            sortButtons.map((btn) => (
                <Button type='button'
                        key={btn}
                        className={` ${selected === btn ? 'bg-[#37A6A6]' : 'bg-transparent'} px-2 py-1 rounded capitalize`}
                        onClick={() => handleSort(btn)}>{btn}</Button>
            ))
        }
    </div>
}