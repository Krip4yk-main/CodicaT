import {Column, DataType, Model, Table} from "sequelize-typescript";
import TransactionsModel from "../interfaces/transactions.interface";
import BankModel from "./bank.model";

@Table({tableName: "transactions", timestamps: true})
class Transactions extends Model<TransactionsModel> {
    @Column({type: DataType.NUMBER, allowNull: false}) //referenced Bank.id
    bankId: number

    @Column({type: DataType.NUMBER, allowNull: false})
    amount: number

    @Column({type: DataType.STRING, allowNull: false})
    category: string

    @Column({type: DataType.STRING, allowNull: false})
    status: string
}

export default Transactions;