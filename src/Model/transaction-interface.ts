export interface TransactionInterface {
    userId?: string,
    description: string,
    amount: number | string,
    amountStatus: string,
    category: string,
    date: string,
    status: string
}