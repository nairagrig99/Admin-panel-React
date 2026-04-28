import {createSlice} from "@reduxjs/toolkit";
import {
    editTransaction,

    removeTransaction,
    sortTransaction,
    TransactionThunk
} from "./ApiThunkTransaction.ts";
import type {TransactionInterface} from "../../Model/transaction-interface.ts";
import {AmountStatus} from "../../Enums/amount-status.ts";

const TRANSACTION_STATE: TransactionInterface[] = [{
    userId: '',
    id: 0,
    description: '',
    amount: 0,
    amountStatus: '',
    category: '',
    date: new Date().toISOString(),
    status: ''
}]
const transactionState = {
    transactions: TRANSACTION_STATE,
    sortBy:AmountStatus.ALL,
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
            .addCase(TransactionThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(TransactionThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(removeTransaction.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeTransaction.fulfilled, (state, action) => {
                state.loading = false
                const {id} = action.payload
                const findIndex = state.transactions.findIndex((t) => t.id === id);
                if (findIndex != -1) {
                    state.transactions.splice(findIndex, 1)
                    state.totalCount = state.totalCount--
                }
            })
            .addCase(removeTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(editTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editTransaction.fulfilled, (state, action) => {
                state.loading = false;
                const {id} = action.payload
                const findIndex = state.transactions.findIndex((t) => t.id === id);

                if (findIndex != -1) {
                    state.transactions[findIndex] = action.payload
                }
            })
            .addCase(editTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(sortTransaction.pending, (state, action) => {
                state.loading = false;
                state.error = action.payload
            }).addCase(sortTransaction.fulfilled, (state, action) => {
            state.loading = false;
            state.transactions = action.payload.data
            state.totalCount = action.payload.totalCount
            state.sortBy=action.payload.sortBy
        }).addCase(sortTransaction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        })
    }
})

export default transactionSlice.reducer;