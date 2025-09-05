import { IsString, IsBoolean, IsNumber, isNumber } from 'class-validator';
export class CreateProductDto {
  @IsBoolean()
  active: boolean;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stockQuantity: number;

  @IsNumber()
  supplierId: number;

  @IsNumber()
  categoryId: number;
}
