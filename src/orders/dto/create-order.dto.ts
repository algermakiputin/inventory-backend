import { IsNumber } from 'class-validator';
import { CreateOrderItemDto } from 'src/order-item/dto/create-order-item.dto';
export class CreateOrderDto {
  @IsNumber()
  total: number;
  orderItem: CreateOrderItemDto[];
}
