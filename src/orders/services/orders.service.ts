import { ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import { AuthService } from '../../auth/services/auth.service';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/orders.dto';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersService {

  private counterId = 1;
  private orders: Order[] = [{
    id: 1,
    name:'string'
    //date:Date;
    //customer: User;
    //products:Product;
  }]

  findAll() {
    return this.orders;
  }

  findOne(id: number) {
    const order = this.orders.find((item) => item.id === id);
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order;
  }

  ordersCustomer
  oneByCustomer
  oneItemFromOrder

  create(payload: CreateOrderDto) {
    console.log(payload);
    this.counterId = this.counterId + 1;
    const newOrder = {
      id: this.counterId,
      ...payload,
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  update(id: number, payload: UpdateOrderDto) {
    const order = this.findOne(id);
    const index = this.orders.findIndex((item) => item.id === id);
    this.orders[index] = {
      ...order,
      ...payload,
    };
    return this.orders[index];
  }

  remove(id: number) {
    const index = this.orders.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    this.orders.splice(index, 1);
    return true;
  }
}
