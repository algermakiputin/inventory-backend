import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { prisma } from 'lib/prisma';
import { Prisma } from '@prisma/client';
@Injectable()
export class CategoriesService {
  create(createCategoryDto: CreateCategoryDto) {
    return prisma.category.create({
      data: { ...createCategoryDto, isDeleted: false },
    });
  }

  async findAll(page: number, limit: number, query?: string) {
    const or: Prisma.CategoryWhereInput = {
      OR: [
        {
          name: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: query,
            mode: 'insensitive',
          },
        },
      ],
    };
    const [data, total] = await prisma.$transaction([
      prisma.category.findMany({
        skip: page - 1,
        take: limit,
        orderBy: {
          id: 'desc',
        },
        where: {
          isDeleted: false,
          OR: or.OR,
        },
      }),
      prisma.category.count({
        where: {
          isDeleted: false,
          OR: or.OR,
        },
      }),
    ]);
    return {
      records: data,
      totalRecords: total,
      totalPages: Math.ceil(total / page),
    };
  }

  findOne(id: number) {
    return prisma.category.findFirst({
      where: {
        id,
      },
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return prisma.category.update({
      where: {
        id,
      },
      data: updateCategoryDto,
    });
  }

  remove(id: number) {
    return prisma.category.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });
  }

  async findAllWithItemsCount() {
    const [data, productCount] = await prisma.$transaction([
      prisma.category.findMany({
        where: { isDeleted: false },
        include: {
          _count: {
            select: { Product: { where: { isDeleted: false } } },
          },
        },
      }),
      prisma.product.count({ where: { isDeleted: false } }),
    ]);
    return {
      records: data,
      productCount,
    };
  }
}
