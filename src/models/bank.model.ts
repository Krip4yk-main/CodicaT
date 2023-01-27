import {Column, DataType, Model, Table} from "sequelize-typescript";
import BankModel from "../interfaces/bank.interface";

@Table({tableName: "bank", timestamps: true})
class Bank extends Model<BankModel> {
    @Column({type: DataType.STRING, allowNull: false, defaultValue: 'Default Bank'})
    name: string

    @Column({type: DataType.NUMBER, allowNull: false, defaultValue: 0})
    balance: number
}

export default Bank;