import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class BrandsService {

  constructor(@InjectRepository(Brand) private brands:Repository<Brand>){}

  findAll() {
    return this.brands.find();
  }

  async findOne(id: number) {
    const brand = await this.brands.findOne({
      relations:['products'],
      where:{id:id}
    });
    if (!brand) {
      throw new NotFoundException(`Marca #${id} no encontrada`);
    }
    return brand;
  }

  create(payload: CreateBrandDto) {
    const newBrand = this.brands.create(payload)
    return this.brands.save(newBrand)
  }

  async update(id: number, payload: UpdateBrandDto) {
    const brand = await this.brands.findOneBy({id:id});
    this.brands.merge(brand, payload);
    return this.brands.save(brand);
  }

  async remove(id: number) {
    const findBrand = await this.findOne(id)
    if(!findBrand){
      throw new BadRequestException(`Marca #${id} no encontrada`);
    }
    return this.brands.delete({id:id})
  }
}
