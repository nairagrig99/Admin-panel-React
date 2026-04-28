import Button from "../../UI/Button.tsx";
import Popup from "../../UI/Popup.tsx";
import {useState} from "react";
import AddTransactionModal from "./AddTransactionModal.tsx";
import {PopupMode} from "../../../Enums/popup-mode.ts";

export default function AddTransaction() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleTransaction = () => setIsOpen(true);

    return <>
        <Button onClick={handleTransaction} type="button" value='Add Transaction'
                className="bg-[#1D585A] flex px-3 py-1 rounded text-[#A1D1D3] w-fit h-fit">
            <b>+</b>
            <p>Add Transaction</p>
        </Button>
        <Popup isOpen={isOpen}>
            <AddTransactionModal closePopup={() => setIsOpen(false)} editDate={{data: [], mode: PopupMode.CREATE}}/>
        </Popup>
    </>
}