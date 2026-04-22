import Button from "./Button.tsx";

import {memo, useEffect, useRef} from "react";
import type {SelectRadioBtnType} from "../../Model/select-radio-btn.ts";

const SelectRadioBtn = memo(({values, className, name, selectedColor, setSelected}: SelectRadioBtnType) => {

    const refs = useRef<HTMLButtonElement[]>([]);
    const handleSelect = (e: React.ChangeEvent<HTMLButtonElement>, index: number) => {
        setSelected(e);
        refs.current.forEach((el) => removeTag(el));
        selectedTab(index)
    }
    const removeTag = (el: HTMLButtonElement) => {
        el.classList.remove(selectedColor)
        el.classList.add('bg-gray-500')
    }

    const selectedTab = (index: number) => {
        refs.current[index].classList.remove('bg-gray-500')
        refs.current[index].classList.add(selectedColor);
    }

    useEffect(() => {
        if (refs.current.length) {
            selectedTab(0)
        }
    }, []);

    return <div className={className}>
        {values.map((status, index) => (
            <Button name={name} ref={(el) => {
                if (el) {
                    refs.current[index] = el
                }
            }} onClick={(e) => handleSelect(e, index)}
                    className={`px-[6px] py-[2px] rounded-[5px] capitalize cursor-pointer bg-gray-500`}
                    key={status.value} value={status.value} type="button">{status.value}</Button>
        ))
        }
    </div>


})
export default SelectRadioBtn