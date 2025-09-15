import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { CreateOrderItemDto } from 'src/order-item/dto/create-order-item.dto';
export class CreateOrderDto {
  @IsString()
  status: string;
  @IsNumber()
  totalAmount: number;
  @IsNumber()
  subTotal: number;
  @IsNumber()
  discount: number;

  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  orderItem: CreateOrderItemDto[];
}
