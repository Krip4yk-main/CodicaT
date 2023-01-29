export default interface TransactionsModel {
    id?: number,
    bankId: number,
    amount: number,
    categories: string[] | string,
    status: string,
    createdAt?: any,
    updatedAta?: any
}