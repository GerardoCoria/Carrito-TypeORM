import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateCheckoutDto, UpdateCheckoutDto } from '../dtos/checkout.dto';
import { Checkout } from '../entities/checkout.entity';

@Injectable()
export class CheckoutService {

  private counterId = 1;
  private checkout: Checkout[] = []

  findAll() {
    return this.checkout;
  }

  findOne(id: number) {
    const product = this.checkout.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(payload: CreateProductDto) {
    console.log(payload);
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.checkout.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateProductDto) {
    const product = this.findOne(id);
    const index = this.checkout.findIndex((item) => item.id === id);
    this.checkout[index] = {
      ...product,
      ...payload,
    };
    return this.checkout[index];
  }

  remove(id: number) {
    const index = this.checkout.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.checkout.splice(index, 1);
    return true;
  }
}
