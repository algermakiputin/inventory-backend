import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { prisma } from 'lib/prisma';
@Injectable()
export class OrderItemService {
  create(createOrderItemDto: CreateOrderItemDto[]) {
    return prisma.orderItem.createMany({ data: createOrderItemDto });
  }
}
