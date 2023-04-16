import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../schema/product.schema';
import { Model } from 'mongoose';
import { SaveProductDto } from '../dtos/database/save-product.dto';

@Injectable()
export class ProductCreateService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}
  public async saveProduct(saveProductDto: SaveProductDto) {
    return await new this.productModel(saveProductDto).save();
  }
}
