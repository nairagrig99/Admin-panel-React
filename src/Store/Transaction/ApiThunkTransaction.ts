import {createAsyncThunk} from "@reduxjs/toolkit";
import type {TransactionInterface} from "../../Model/transaction-interface.ts";
import {ERROR_MSG, LIMIT, URL_TRANSACTIONS} from "../../constants/constant.ts";
import {ErrorHelper} from "../../utils/errorHelper.ts";
import type {EditTransaction} from "../../Model/edit-transaction-type.ts";

import {AmountStatus} from "../../Enums/amount-status.ts";

export const TransactionThunk = createAsyncThunk(
    'add/transaction',
    async (data: TransactionInterface) => {
        try {
            const response = await fetch(`${URL_TRANSACTIONS}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                ErrorHelper(ERROR_MSG)
            }

            await new Promise((resolve) => setTimeout(resolve, 1000));

            return await response.json();

        } catch (err) {
            console.error(err)
        }
    }
)
export type TransactionParams = {
    start: number;
    end: number,
    id: number
}
// export const getTransaction = createAsyncThunk(
//     'get/Transactions',
//     async ({start, end, id}: TransactionParams) => {
//         try {
//             const response = await fetch(`${URL_TRANSACTIONS}?userId=${id}&_page=${start}&_limit=${end}`, {
//                 method: 'GET'
//             })
//
//             if (!response.ok) {
//                 ErrorHelper(ERROR_MSG)
//             }
//
//             const data = await response.json();
//
//             const totalCount = response.headers.get("x-total-count");
//             return {data: data, totalCount: Number(totalCount)};
//         } catch (err) {
//             console.error(err)
//         }
//
//     }
// )

export const removeTransaction = createAsyncThunk(
    'remove/Transaction',
    async (id: number) => {
        try {
            const response = await fetch(`${URL_TRANSACTIONS}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                ErrorHelper(ERROR_MSG)
            }

            return {id: id};

        } catch (err) {
            console.error(err)
        }

    }
)


export const editTransaction = createAsyncThunk(
    'update/Transaction',
    async (data: EditTransaction) => {
        try {

            const response = await fetch(`${URL_TRANSACTIONS}/${data.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data.data)
            });

            if (!response.ok) ErrorHelper(ERROR_MSG)

            return await response.json();
        } catch (err) {
            console.error(err)
        }

    }
)

export type SortByType = {
    sortBy: AmountStatus
} & TransactionParams

export const sortTransaction = createAsyncThunk(
    'sort/Transaction',
    async (sort: SortByType) => {
        const params = new URLSearchParams({
            userId: sort.id,
            _page: sort.start,
            _limit: sort.end
        })

        if (sort.sortBy !== AmountStatus.ALL) {
            params.append('amountStatus', sort.sortBy)
        }


        const response = await fetch(`${URL_TRANSACTIONS}?${params.toString()}`);
        if (!response.ok) ErrorHelper(ERROR_MSG)
        const data = await response.json();
        const totalCount = response.headers.get("x-total-count")
        return {data: data, totalCount: totalCount, sortBy: sort.sortBy}
    }
)