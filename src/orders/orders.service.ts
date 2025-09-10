import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { prisma } from 'lib/prisma';
import { OrderItemService } from 'src/order-item/order-item.service';

@Injectable()
export class OrdersService {
  constructor(private orderItemService: OrderItemService) {}
  create(createOrderDto: CreateOrderDto) {
    return prisma.$transaction([
      prisma.order.create({ data: createOrderDto }),
      this.orderItemService.create(createOrderDto.orderItem),
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
