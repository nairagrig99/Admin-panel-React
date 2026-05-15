import type {TransactionInterface} from "./transaction-interface.ts";

export type EditTransaction = {
    data: TransactionInterface,
    mode: string
}