import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { prisma } from 'lib/prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  async create(createProductDto: CreateProductDto) {
    return await prisma.product.create({ data: createProductDto });
  }

  async findAll(page: number = 1, limit: number = 10, search?: string) {
    const or: Prisma.ProductWhereInput = {
      OR: [
        {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ],
    };
    const [data, total] = await prisma.$transaction([
      prisma.product.findMany({
        where: { isActive: true, OR: or.OR },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          name: true,
          description: true,
          price: true,
          stockQuantity: true,
          id: true,
          Supplier: {
            select: { name: true },
          },
          Category: {
            select: { name: true },
          },
        },
        orderBy: {
          id: 'desc',
        },
      }),
      prisma.product.count({
        where: {
          isActive: true,
          OR: or.OR,
        },
      }),
    ]);
    return {
      data: data,
      totalRecords: total,
      totalPages: Math.ceil(total / limit),
    };
  }

  findOne(id: number) {
    return prisma.product.findFirst({ where: { id: id } });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    try {
      return prisma.product.update({
        where: {
          id,
        },
        data: updateProductDto,
      });
    } catch (error) {
      console.log(`error: `, error);
    }
  }

  remove(id: number) {
    return prisma.product.update({
      where: { id },
      data: {
        isActive: false,
      },
    });
  }
}
