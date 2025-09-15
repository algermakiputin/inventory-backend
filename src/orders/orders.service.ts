import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { prisma } from 'lib/prisma';
import { OrderItemService } from 'src/order-item/order-item.service';

@Injectable()
export class OrdersService {
  constructor(private orderItemService: OrderItemService) {}
  create(createOrderDto: CreateOrderDto) {
    return prisma.$transaction(async (transaction) => {
      const order = await transaction.order.create({
        data: {
          status: createOrderDto.status,
          totalAmount: createOrderDto.totalAmount,
          subTotal: createOrderDto.subTotal,
          discount: createOrderDto.discount,
        },
      });

      const orderItems = createOrderDto.orderItem.map((item) => ({
        ...item,
        orderId: order.id, // 👈 link items to the order
      }));
      console.log(`orderItems: `, orderItems);
      // 2. create order items with orderId from the created order
      await transaction.orderItem.createMany({
        data: orderItems,
      });

      return order;
    });
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
