import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateCheckoutDto, UpdateCheckoutDto } from '../dtos/checkout.dto';
import { Checkout } from '../entities/checkout.entity';

@Injectable()
export class CheckoutService {

  private counterId = 1;
  private checkout: Checkout[] = [{
    id:1,
    name:'string',
    price: 111,
    quantity: 1
  }]

  findAll() {
    return this.checkout;
  }

  findOne(id: number) {
    const checkout = this.checkout.find((item) => item.id === id);
    if (!checkout) {
      throw new NotFoundException(`Checkout #${id} not found`);
    }
    return checkout;
  }

  create(payload: CreateCheckoutDto) {
    console.log(payload);
    this.counterId = this.counterId + 1;
    const newCheckout = {
      id: this.counterId,
      ...payload,
    };
    this.checkout.push(newCheckout);
    return newCheckout;
  }

  update(id: number, payload: UpdateCheckoutDto) {
    const checkout = this.findOne(id);
    const index = this.checkout.findIndex((item) => item.id === id);
    this.checkout[index] = {
      ...checkout,
      ...payload,
    };
    return this.checkout[index];
  }

  remove(id: number) {
    const index = this.checkout.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Checkout #${id} not found`);
    }
    this.checkout.splice(index, 1);
    return true;
  }
}
