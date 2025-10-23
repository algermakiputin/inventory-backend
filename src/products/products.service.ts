import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { prisma } from 'lib/prisma';

@Injectable()
export class ProductsService {
  async create(createProductDto: CreateProductDto) {
    return await prisma.product.create({
      data: {
        ...createProductDto,
        stockQuantity: 0,
      },
    });
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    search?: string,
    categoryId?: number,
  ) {
    const [data, total] = await prisma.$transaction([
      prisma.product.findMany({
        where: {
          isDeleted: false,
          ...(search && {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          }),
          ...(categoryId && { categoryId: categoryId }),
        },
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
          isDeleted: false,
          name: {
            contains: search,
            mode: 'insensitive',
          },
          ...(categoryId && { categoryId: categoryId }),
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
    console.log(`id:`, id);
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
        isDeleted: true,
      },
    });
  }
}
