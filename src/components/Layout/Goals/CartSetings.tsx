import {DeleteIcon} from "../../UI/DeleteSvg.tsx";
import {EditIcon} from "../../UI/EditSvg.tsx";
import type {CartSettingsProps} from "../../../Enums/cart-settings-props.ts";

export default function CartSettings({handleRemove, handleEdit}: CartSettingsProps) {
    return <div className="flex justify-around">
        <DeleteIcon onClick={handleRemove}/>
        <EditIcon onClick={handleEdit}/>
    </div>
}