import { Injectable, ParseIntPipe, Query } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { prisma } from 'lib/prisma';

@Injectable()
export class SuppliersService {
  create(createSupplierDto: CreateSupplierDto) {
    return prisma.supplier.create({ data: createSupplierDto });
  }

  async findAll(
    @Query('page', ParseIntPipe) page,
    @Query('limit', ParseIntPipe) limit,
  ) {
    const [data, total] = await prisma.$transaction([
      prisma.supplier.findMany({
        where: {
          isActive: true,
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.supplier.count({ where: { isActive: true } }),
    ]);
    return {
      data,
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
