import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { prisma } from 'lib/prisma';

@Injectable()
export class ProductsService {
  async create(createProductDto: CreateProductDto) {
    return await prisma.product.create({ data: createProductDto });
  }

  async findAll(page: number, limit: number) {
    const [data, total] = await prisma.$transaction([
      prisma.product.findMany({
        where: { active: true },
        skip: page - 1,
        take: limit,
      }),
      prisma.product.count({
        where: {
          active: true,
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
        active: false,
      },
    });
  }
}
