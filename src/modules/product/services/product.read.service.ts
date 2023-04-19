import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../schema/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductReadService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  public async getProductList() {
    return await this.productModel.find({ visible: true });
  }

  public async getProductById(productId: any) {
    return await this.productModel.findOne({ visible: true, _id: productId });
  }
}
