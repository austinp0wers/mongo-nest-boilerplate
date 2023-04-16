import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { Types } from 'mongoose';

export class SaveProductDto {
  @IsString()
  @Length(1, 128)
  readonly name: string;

  @IsNotEmpty()
  @IsMongoId()
  readonly seller: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsNumber()
  @IsOptional()
  readonly quantity: number;

  @IsNotEmpty()
  @IsMongoId()
  readonly category: Types.ObjectId;

  @IsOptional()
  @ValidateNested({ each: true })
  readonly tags: string[];
}
