import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../db'

interface ImageModel {
  id: number
  imageUrl: string
  imageName: string
  imageAlt: string

  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface ImageInput extends Optional<ImageModel, 'id'> {}
export interface ImageOutput extends Required<ImageModel> {}

class Image extends Model<ImageModel, ImageInput> implements ImageModel {
  public id!: number
  public imageUrl!: string
  public imageName!: string
  public imageAlt!: string

  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

Image.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imageName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imageAlt: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true,
  sequelize,
  paranoid: true
})

export default Image