import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Vendor, VendorDocument } from '../schemas/vendor.schema';
import { Model } from 'mongoose';

@Injectable()
export class VendorRepository {
  constructor(
    @InjectModel(Vendor.name) private vendorModel: Model<VendorDocument>,
  ) {}

  async create(vendor: Partial<Vendor>): Promise<Vendor> {
    const newvendor = new this.vendorModel(vendor);
    return newvendor.save();
  }

  async findByEmail(email: string): Promise<Vendor | null> {
    return this.vendorModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<Vendor | null> {
    return this.vendorModel.findById(id).exec();
  }

  async update(
    id: string,
    updateData: Partial<Vendor>,
  ): Promise<Vendor | null> {
    return this.vendorModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }
}
