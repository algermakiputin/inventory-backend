import { Injectable, ParseIntPipe, Query } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { prisma } from 'lib/prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class SuppliersService {
  create(createSupplierDto: CreateSupplierDto) {
    return prisma.supplier.create({ data: createSupplierDto });
  }

  async findAll(
    @Query('page', ParseIntPipe) page,
    @Query('limit', ParseIntPipe) limit,
    @Query('search') search = '',
  ) {
    const or: Prisma.SupplierWhereInput = {
      OR: [{ name: { contains: search, mode: 'insensitive' } }],
    };
    const [data, total] = await prisma.$transaction([
      prisma.supplier.findMany({
        where: {
          isActive: true,
          OR: or.OR,
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.supplier.count({ where: { isActive: true, OR: or.OR } }),
    ]);
    return {
      records: data,
      totalRecords: total,
      totalPages: Math.ceil(total / limit),
    };
  }

  findOne(id: number) {
    return prisma.supplier.findFirst({ where: { id: id } });
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto) {
    return prisma.supplier.update({
      where: {
        id,
      },
      data: updateSupplierDto,
    });
  }

  remove(id: number) {
    return prisma.supplier.update({ where: { id }, data: { isActive: false } });
  }
}
