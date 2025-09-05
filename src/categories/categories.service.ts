import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { prisma } from 'lib/prisma';

@Injectable()
export class CategoriesService {
  create(createCategoryDto: CreateCategoryDto) {
    return prisma.category.create({ data: createCategoryDto });
  }

  async findAll(page: number, limit: number) {
    const [data, total] = await prisma.$transaction([
      prisma.category.findMany({
        skip: page - 1,
        take: limit,
      }),
      prisma.category.count({
        where: {
          isActive: true,
        },
      }),
    ]);
    return {
      data: data,
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
        isActive: false,
      },
    });
  }
}
