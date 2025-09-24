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
      // 2. create order items with orderId from the created order
      await transaction.orderItem.createMany({
        data: orderItems,
      });

      return order;
    });
  }

  async findAll(page: number = 1, limit: number = 10) {
    const [orders, totalRecords] = await prisma.$transaction([
      prisma.order.findMany({
        skip: page - 1,
        take: limit,
        orderBy: {
          id: 'desc',
        },
      }),
      prisma.order.count(),
    ]);
    return {
      records: orders,
      totalRecords,
    };
  }

  async findOne(id: number) {
    const [order, orderItems] = await prisma.$transaction([
      prisma.order.findFirst({ where: { id } }),
      prisma.orderItem.findMany({
        where: {
          orderId: id,
        },
        include: {
          product: true,
        },
      }),
    ]);
    return {
      order,
      orderItems,
    };
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return prisma.order.update({ where: { id }, data: updateOrderDto });
  }

  remove(id: number) {
    return prisma.order.delete({ where: { id } });
  }
}
