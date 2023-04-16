import { Controller, Delete, Param, Req, Res } from '@nestjs/common';

@Controller('product')
export class ProductDeleteController {
  constructor() {}

  @Delete(':productId')
  public async getProduct(@Req() req, @Res() res, @Param() productIdDto) {
    return res.json({
      code: 200,
    });
  }
}
