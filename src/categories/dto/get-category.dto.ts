import { IsOptional } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class GetCategoriesDto {
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @Type(() => Number)
  @IsOptional()
  limit?: number;

  @Type(() => String)
  @IsOptional()
  search?: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  withProductCount?: boolean;
}
