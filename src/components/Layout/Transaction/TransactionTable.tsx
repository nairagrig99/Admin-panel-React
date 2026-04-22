import {Component} from "react";
import type {RootState} from "../../../Store/store.ts";
import {connect} from "react-redux";
import {DeleteIcon} from "../../UI/DeleteSvg.tsx";
import {EditIcon} from "../../UI/EditSvg.tsx";
import Pagination from "./Pagination.tsx";

export class TransactionTable extends Component<any> {
    render() {

        const {transactions, totalCount} = this.props;
        return (
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm mt-10">
                <table className="w-full divide-y divide-gray-200 text-sm text-left">
                    <thead className="bg-[#0F1F1F] text-white capitalize font-semibold">
                    <tr>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Description</th>
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3">Amount</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-right"></th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-[#0F1F1F]">
                    {transactions.map((item) => (
                        <tr key={item.id + new Date().getMinutes()}
                            className="hover:bg-[#63B6BD] cursor-pointer transition-colors">
                            <td className="px-4 py-3 text-white">{item.date}</td>
                            <td className="px-4 py-3 font-medium text-white">{item.description}</td>
                            <td className="px-4 py-3 text-white">{item.category}</td>
                            <td className={`px-4 py-3 font-bold ${item.amount < 0 ? 'text-red-500' : 'text-green-600'}`}>
                                {item.amount > 0 ? `+${item.amount}` : item.amount} $
                            </td>
                            <td className="px-6 py-4 text-left">
                    <span
                        className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                      {item.status}
                    </span>
                            </td>
                            <td className='flex gap-1 items-center px-6 py-4 font-bold text-green-600'>
                                <DeleteIcon className='text-gray-600'></DeleteIcon>
                                <EditIcon className='text-gray-600'></EditIcon>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {totalCount > 0 && (<div className="flex justify-center items-center py-4 w-full">
                    <Pagination/>
                </div>)}
            </div>
        );
    };
}

const mapStateToProps = (state: RootState) => ({
    transactions: state.transaction.transactions,
    totalCount: state.transaction.totalCount
})
export default connect(mapStateToProps)(TransactionTable)