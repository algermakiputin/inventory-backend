import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderItemService } from 'src/order-item/order-item.service';
import { OrdersController } from './orders.controller';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, OrderItemService],
})
export class OrdersModule {}
