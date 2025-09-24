import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class findAllOrdersDto {
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @Type(() => Number)
  @IsOptional()
  limit?: number;

  @Type(() => String)
  @IsOptional()
  search?: string;
}
