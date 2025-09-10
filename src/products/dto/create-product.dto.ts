import { Type } from 'class-transformer';
import { IsString, IsBoolean, IsNumber } from 'class-validator';
export class CreateProductDto {
  @Type(() => Boolean)
  @IsBoolean()
  isActive: boolean;

  @Type(() => String)
  @IsString()
  name: string;

  @Type(() => String)
  @IsString()
  description: string;

  @Type(() => Number)
  @IsNumber()
  price: number;

  @Type(() => Number)
  @IsNumber()
  stockQuantity: number;

  @Type(() => Number)
  @IsNumber()
  supplierId: number;

  @Type(() => Number)
  @IsNumber()
  categoryId: number;
}
