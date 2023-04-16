import { Body, Controller, Get, Param, Req, Res } from '@nestjs/common';

@Controller('product')
export class ProductGetController {
  constructor() {}

  @Get(':productId')
  public async getProduct(@Req() req, @Res() res, @Param() productIdDto) {
    return res.json({
      code: 200,
    });
  }

  @Get()
  public async getProductList(@Req() req, @Res() res) {
    return res.json({
      code: 200,
    });
  }
}
