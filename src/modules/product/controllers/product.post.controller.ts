import { SaveProductDto } from '../dtos/database/save-product.dto';
import { StringHelperService } from './../../../shared/utils/helper/string.helper.service';
import { ProductCreateService } from './../services/product.create.service';
import { Body, Controller, Post, Req, Res } from '@nestjs/common';

@Controller('product')
export class ProductPostController {
  constructor(
    private readonly productCreateService: ProductCreateService,
    private readonly stringHelperService: StringHelperService,
  ) {}

  @Post()
  public async addProduct(@Req() req, @Res() res, @Body() productSaveDto: any) {
    // escape unnecessary characters
    const description = this.stringHelperService.escapeSpecialCharacters(
      productSaveDto.description,
    );
    const name = this.stringHelperService.escapeSpecialCharacters(
      productSaveDto.name,
    );

    const saveProductDto: SaveProductDto = {
      name,
      description,
      price: productSaveDto.price,
      quantity: productSaveDto.quantity,
      category: productSaveDto.category,
      tags: productSaveDto.tags,
      seller: req.clientId,
    };
    await this.productCreateService.saveProduct(saveProductDto);
    return res.json({
      code: 200,
    });
  }
}
