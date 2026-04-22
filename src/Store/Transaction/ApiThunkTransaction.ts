import {createAsyncThunk} from "@reduxjs/toolkit";
import type {TransactionInterface} from "../../Model/transaction-interface.ts";
import {URL_TRANSACTIONS} from "../../constants/constant.ts";

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
                throw new Error("Something went wrong")
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
export const getTransaction = createAsyncThunk(
    'get/Transactions',
    async ({start, end, id}: TransactionParams) => {

        const response = await fetch(`${URL_TRANSACTIONS}?userId=${id}&_page=${start}&_limit=${end}`, {
            method: 'GET'
        })

        if (!response.ok) {
            throw new Error("Something went wrong")
        }

        const data = await response.json();
        const totalCount = response.headers.get("x-total-count");
        return {data: data, totalCount: Number(totalCount)};
    }
)