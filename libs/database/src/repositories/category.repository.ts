import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category, CategoryDocument } from '../schemas/catalog.schema';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(Category.name) private CategoryModel: Model<CategoryDocument>,
  ) {}

  async create(Category: Partial<Category>): Promise<Category> {
    const newCategory = new this.CategoryModel(Category);
    return newCategory.save();
  }

  async findByVendorId(id: string): Promise<Category[] | null> {
    return this.CategoryModel.find({
      vendor: new Types.ObjectId(id),
    }).exec();
  }

  async deleteById(id: string): Promise<Category | null> {
    return this.CategoryModel.findByIdAndDelete(id).exec();
  }

  async update(
    id: string,
    updateData: Partial<Category>,
  ): Promise<Category | null> {
    return this.CategoryModel.findByIdAndUpdate(id, updateData, {
      new: true,
    }).exec();
  }
}
