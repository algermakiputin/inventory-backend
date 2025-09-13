import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class FindAllProductsDto {
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @Type(() => Number)
  @IsOptional()
  limit?: number;

  @Type(() => String)
  @IsOptional()
  search?: string;

  @Type(() => Number)
  @IsOptional()
  categoryId?: number;
}
