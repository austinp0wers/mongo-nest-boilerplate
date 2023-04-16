import { Body, Controller, Param, Patch, Req, Res } from '@nestjs/common';

@Controller('product')
export class ProductPatchController {
  constructor() {}

  @Patch(':productId')
  public async getProduct(
    @Req() req,
    @Res() res,
    @Param() productIdDto,
    @Body() productPatchDto,
  ) {
    return res.json({
      code: 200,
    });
  }
}
