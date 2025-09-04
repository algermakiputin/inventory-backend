import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { prisma } from 'lib/prisma';

@Injectable()
export class SuppliersService {
  create(createSupplierDto: CreateSupplierDto) {
    return prisma.supplier.create({ data: createSupplierDto });
  }

  findAll() {
    return `This action returns all suppliers`;
  }

  findOne(id: number) {
    return prisma.supplier.findFirst({ where: { id: id } });
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto) {
    return `This action updates a #${id} supplier`;
  }

  remove(id: number) {
    return `This action removes a #${id} supplier`;
  }
}
