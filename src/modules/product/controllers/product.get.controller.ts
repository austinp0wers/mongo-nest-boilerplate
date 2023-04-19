import { ProductReadService } from './../services/product.read.service';
import { Body, Controller, Get, Param, Req, Res } from '@nestjs/common';

@Controller('product')
export class ProductGetController {
  constructor(private readonly productReadService: ProductReadService) {}

  @Get(':productId')
  public async getProduct(@Req() req, @Res() res, @Param() productIdDto) {
    const productDetail = await this.productReadService.getProductById(
      productIdDto.productId,
    );
    return res.json({
      code: 200,
      product: productDetail,
    });
  }

  @Get()
  public async getProductList(@Req() req, @Res() res) {
    const products = await this.productReadService.getProductList();
    return res.json({
      code: 200,
      products,
    });
  }
}
