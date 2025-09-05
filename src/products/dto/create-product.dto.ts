import { IsString, IsBoolean, IsNumber } from 'class-validator';
export class CreateProductDto {
  @IsBoolean()
  isActive: boolean;

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
