import {DataTypes, Model, Optional} from 'sequelize'
import sequelize from '../db'

interface UserModel {
  id: number
  name: string
  email: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface UserInput extends Optional<UserModel, 'id'> {}
export interface UserOutput extends Required<UserModel> {}

class User extends Model<UserModel, UserInput> implements UserModel {
  public id!: number
  public name!: string
  public email!: string

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

User.init({
  id:{
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  timestamps: true,
  sequelize,
  paranoid: true
})

export default User