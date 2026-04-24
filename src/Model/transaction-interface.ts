export interface TransactionInterface {
    userId?: string,
    id: number,
    description: string,
    amount: number | string,
    amountStatus: string,
    category: string,
    date: string,
    status: string
}