import Search from "../../UI/Search.tsx";
import TransactionSort from "./TransactionSort.tsx";
import AddTransaction from "./AddTransaction.tsx";
import TransactionTable from "./TransactionTable.tsx";


export default function Transaction() {
    return <div>
        <h2>Transaction Ledger</h2>
        <div className="flex justify-between p-4 bg-[#63B6BD] rounded">
            <Search/>
            <TransactionSort/>
            <AddTransaction/>
        </div>
        <TransactionTable/>
    </div>

}