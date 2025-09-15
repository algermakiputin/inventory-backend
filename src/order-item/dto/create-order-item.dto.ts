import { IsNumber, IsOptional } from 'class-validator';

export class CreateOrderItemDto {
  @IsOptional()
  @IsNumber()
  orderId: number;
  @IsNumber()
  productId: number;
  @IsNumber()
  quantity: number;
  @IsNumber()
  unitPrice: number;
  @IsNumber()
  totalPrice: number;
}
