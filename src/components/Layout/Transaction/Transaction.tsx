import Search from "../../UI/Search.tsx";
import TransactionSort from "./TransactionSort.tsx";
import AddTransaction from "./AddTransaction.tsx";
import TransactionTable from "./TransactionTable.tsx";

export default function Transaction() {
    return <div>
        <h2 className="mb-4 text-3xl">Transaction Ledger</h2>
        <div className="flex flex-col xl:flex-row gap-2 justify-between p-4 bg-[#63B6BD] rounded">
            <Search/>
            <TransactionSort/>
            <AddTransaction/>
        </div>
        <TransactionTable/>
    </div>

}