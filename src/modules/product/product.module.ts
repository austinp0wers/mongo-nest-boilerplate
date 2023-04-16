import { Module } from '@nestjs/common';
import { ProductUpdateService } from './services/product.update.service';
import { ProductReadService } from './services/product.read.service';
import { ProductCreateService } from './services/product.create.service';
import { ProductGetController } from './controllers/product.get.controller';
import { ProductPostController } from './controllers/product.post.controller';
import { ProductPatchController } from './controllers/product.patch.controller';
import { ProductDeleteController } from './controllers/product.delete.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schema/product.schema';
import { Tag, TagSchema } from './schema/tag.schema';
import { Category, CategorySchema } from './schema/category.schema';
import { HelperModule } from 'src/shared/utils/helper/helper.module';

@Module({
  imports: [
    HelperModule,
    MongooseModule.forFeatureAsync([
      {
        name: Product.name,
        useFactory: () => {
          const schema = ProductSchema;
          return schema;
        },
      },
      {
        name: Tag.name,
        useFactory: () => {
          const schema = TagSchema;
          return schema;
        },
      },
      {
        name: Category.name,
        useFactory: () => {
          const schema = CategorySchema;
          return schema;
        },
      },
    ]),
  ],
  exports: [],
  providers: [ProductUpdateService, ProductReadService, ProductCreateService],
  controllers: [
    ProductGetController,
    ProductPostController,
    ProductPatchController,
    ProductDeleteController,
  ],
})
export class ProductModule {}
