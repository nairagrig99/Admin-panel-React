import {createSlice} from "@reduxjs/toolkit";
import {getTransaction, TransactionThunk} from "./ApiThunkTransaction.ts";
import type {TransactionInterface} from "../../Model/transaction-interface.ts";

const TRANSACTION_STATE: TransactionInterface[] = [{
    userId: '',
    description: '',
    amount: 0,
    amountStatus: '',
    category: '',
    date: new Date().toISOString(),
    status: ''
}]
const transactionState = {
    transactions: TRANSACTION_STATE,
    totalCount: 0,
    status: '',
    loading: false,
    error: null
}
const transactionSlice = createSlice({
    name: 'Transaction',
    initialState: transactionState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(TransactionThunk.pending, (state) => {
            state.loading = true;
            state.error = null
        })
            .addCase(TransactionThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions.push(action.payload)
            })
            .addCase(TransactionThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(getTransaction.pending, (state, action) => {
                state.loading = true;
                state.error = action.payload
            })
            .addCase(getTransaction.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = action.payload.data
                state.totalCount = action.payload.totalCount
            })
            .addCase(getTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
    }
})

export default transactionSlice.reducer;