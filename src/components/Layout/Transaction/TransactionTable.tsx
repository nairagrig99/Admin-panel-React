import React, {Component, useState} from "react";
import type {RootState} from "../../../Store/store.ts";
import {connect} from "react-redux";
import {DeleteIcon} from "../../UI/DeleteSvg.tsx";
import {EditIcon} from "../../UI/EditSvg.tsx";
import Pagination from "./Pagination.tsx";
import {AmountStatus} from "../../../Enums/amount-status.ts";
import {TABLE_HEADER} from "../../../constants/constant.ts";
import type {TransactionInterface} from "../../../Model/transaction-interface.ts";
import {editTransaction, removeTransaction} from "../../../Store/Transaction/ApiThunkTransaction.ts";
import AddTransactionModal from "./AddTransactionModal.tsx";
import Popup from "../../UI/Popup.tsx";
import {closePopup} from "../../../Store/popupSlice.ts";
import {PopupMode} from "../../../Enums/popup-mode.ts";

export class TransactionTable extends Component<any> {

    state = {
        isOpen: false,
        selectedTransaction: null
    }

    render() {

        const {transactions, totalCount, removeTransaction} = this.props;
        const {isOpen} = this.state;

        if (!Number(totalCount)) return null
        const removeTransactionItem = (item: TransactionInterface) => {
            removeTransaction(item.id);
        }
        const openTransactionPopup = (item: TransactionInterface) => {
            this.setState({isOpen: true, selectedTransaction: item})
        }
        const closePopup = () => {
            this.setState({isOpen: false})
        }

        return (
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm mt-10">
                <table className="w-full divide-y divide-gray-200 text-sm text-left">
                    <thead className="bg-[#0F1F1F] text-white capitalize font-semibold">
                    <tr>
                        {
                            TABLE_HEADER.map((h) => (<th key={h} className="px-4 py-3">{h}</th>))
                        }
                        <th className="px-4 py-3 text-right"></th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-[#0F1F1F]">
                    {transactions.map((item) => (
                        <tr key={item.id}
                            className="hover:bg-[#63B6BD] cursor-pointer transition-colors">
                            <td className="px-4 py-3 text-white">{item.date}</td>
                            <td className="px-4 py-3 font-medium text-white">{item.description}</td>
                            <td className="px-4 py-3 text-white">{item.category}</td>
                            <td className={`px-4 py-3 font-bold ${item.amountStatus.toLowerCase() === AmountStatus.INCOME ? 'text-green-600' : 'text-red-500'}`}>
                                {item.amountStatus.toLowerCase() === AmountStatus.INCOME ? `+${item.amount}` : `-${item.amount}`} $
                            </td>
                            <td className="px-6 py-4 text-left">
                    <span
                        className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                      {item.status}
                    </span>
                            </td>
                            <td className='flex gap-1 items-center px-6 py-4 font-bold text-green-600'>
                                <DeleteIcon className='text-red-600'
                                            onClick={() => removeTransactionItem(item)}></DeleteIcon>
                                <EditIcon
                                    onClick={()=>openTransactionPopup(item)}
                                    className='text-gray-600'></EditIcon>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {totalCount > 0 && (<div className="flex justify-center items-center py-4 w-full">
                    <Pagination/>
                </div>)}
                <Popup isOpen={isOpen}>
                    <AddTransactionModal closePopup={closePopup} editDate={{data: this.state.selectedTransaction, mode: PopupMode.EDIT}}
                    ></AddTransactionModal>
                </Popup>
            </div>
        );
    };
}

const mapStateToProps = (state: RootState) => ({
    transactions: state.transaction.transactions,
    totalCount: state.transaction.totalCount
});
const mapDispatchToProps = {removeTransaction, editTransaction}
export default connect(mapStateToProps, mapDispatchToProps)(TransactionTable)