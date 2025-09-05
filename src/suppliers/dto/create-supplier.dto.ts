import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
export class CreateSupplierDto {
  @Type(() => String)
  @IsString()
  name: string;

  @IsString()
  @Type(() => String)
  email: string;
  isActive: boolean;
}
