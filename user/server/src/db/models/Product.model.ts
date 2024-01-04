import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../db'

interface ProductModel {
  id:number
  title: string
  description: string
  rating: number
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface ProductInput extends Optional<ProductModel, 'id'> {}
export interface ProductOutput extends Required<ProductModel> {}

class Product extends Model<ProductModel, ProductInput> implements ProductModel {
  public id!: number
  public title!: string
  public description!: string
  public rating!: number

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Product.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rating: {
    type: DataTypes.DOUBLE,
    allowNull: true
  }
}, {
  timestamps: true,
  sequelize,
  paranoid: true
})

export default Product