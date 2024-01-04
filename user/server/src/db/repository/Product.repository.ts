import { ProductOutput } from '../models/Product.model'
import { FindOptions } from 'sequelize'
import { Product } from '../models'

export const getProducts = async (page = 1, pageSize = 10): Promise<ProductOutput[]> => {
  try {
    const offset = (page - 1) * pageSize;
    const options: FindOptions = {
      offset,
      limit: pageSize,
      order: [['createdAt', 'DESC']],
      where: {
        deletedAt: null,
      },
    }
    return await Product.findAll(options)
  } catch (e) {
    throw new Error(`Error fetching paginated products: ${e}`)
  }
}