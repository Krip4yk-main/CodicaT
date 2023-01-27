import {Column, DataType, Model, Table} from "sequelize-typescript";
import CategoryModel from "../interfaces/category.interface";

@Table({tableName: "category", timestamps: false})
class Category extends Model<CategoryModel> {
    @Column({type: DataType.STRING, allowNull: false, unique: true})
    name: string
}

export default Category;