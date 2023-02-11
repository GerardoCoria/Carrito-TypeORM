import { ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import { AuthService } from '../../auth/services/auth.service';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/orders.dto';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersService {

  private counterId = 1;
  private orders: Order[] = []

  findAll() {
    return this.orders;
  }

  findOne(id: number) {
    const product = this.orders.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  ordersCustomer
  oneByCustomer
  oneItemFromOrder

  create(payload: CreateProductDto) {
    console.log(payload);
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.orders.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateProductDto) {
    const product = this.findOne(id);
    const index = this.orders.findIndex((item) => item.id === id);
    this.orders[index] = {
      ...product,
      ...payload,
    };
    return this.orders[index];
  }

  remove(id: number) {
    const index = this.orders.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.orders.splice(index, 1);
    return true;
  }
}
