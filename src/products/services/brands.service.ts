import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class BrandsService {

  private counterId = 1;
  private brands: Brand[] = [{
    id:1,
    name:'name'
  }]

  findAll() {
    return this.brands;
  }

  findOne(id: number) {
    const product = this.brands.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(payload: CreateBrandDto) {
    console.log(payload);
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.brands.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateBrandDto) {
    const product = this.findOne(id);
    const index = this.brands.findIndex((item) => item.id === id);
    this.brands[index] = {
      ...product,
      ...payload,
    };
    return this.brands[index];
  }

  remove(id: number) {
    const index = this.brands.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.brands.splice(index, 1);
    return true;
  }
}
