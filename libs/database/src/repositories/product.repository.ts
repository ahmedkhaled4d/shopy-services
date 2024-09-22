import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product, ProductDocument } from '../schemas/catalog.schema';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name) private ProductModel: Model<ProductDocument>,
  ) {}

  async create(Product: Partial<Product>): Promise<Product> {
    const newProduct = new this.ProductModel(Product);
    return newProduct.save();
  }

  async findByVendorId(id: string): Promise<Product[] | null> {
    return this.ProductModel.find({
      vendor: new Types.ObjectId(id),
    }).exec();
  }

  async deleteById(id: string): Promise<Product | null> {
    return this.ProductModel.findByIdAndDelete(id).exec();
  }

  async update(
    id: string,
    updateData: Partial<Product>,
  ): Promise<Product | null> {
    return this.ProductModel.findByIdAndUpdate(id, updateData, {
      new: true,
    }).exec();
  }
}
