import type {EditTransaction} from "./edit-transaction-type.ts";

export interface ModalProps {
    closePopup: () => void;
    editDate?: EditTransaction
}