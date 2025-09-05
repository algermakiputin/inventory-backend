import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { prisma } from 'lib/prisma';
import { OrderItemService } from 'src/order-item/order-item.service';
import { CreateOrderItemDto } from 'src/order-item/dto/create-order-item.dto';

@Injectable()
export class OrdersService {
  constructor(private orderItemService: OrderItemService) {}
  create(
    createOrderDto: CreateOrderDto,
    createOrderItemDto: CreateOrderItemDto[],
  ) {
    return prisma.$transaction([
      prisma.order.create({ data: createOrderDto }),
      this.orderItemService.create(createOrderItemDto),
    ]);
  }

  findAll() {
    return prisma.order.findMany();
  }

  findOne(id: number) {
    return prisma.order.findFirst({ where: { id } });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return prisma.order.update({ where: { id }, data: updateOrderDto });
  }

  remove(id: number) {
    return prisma.order.delete({ where: { id } });
  }
}
