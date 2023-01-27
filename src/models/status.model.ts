import {Column, DataType, Model, Table} from "sequelize-typescript";
import StatusModel from "../interfaces/status.interface";

@Table({tableName: "status", timestamps: false})
class Status extends Model<StatusModel> {
    @Column({type: DataType.STRING, allowNull: false, unique: true})
    name: string
}

export default Status;