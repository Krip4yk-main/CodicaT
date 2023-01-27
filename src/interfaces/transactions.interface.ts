export default interface TransactionsModel {
    id?: number,
    bankId: number,
    amount: number,
    category: string,
    status: string,
    createdAt?: any,
    updatedAta?: any
}