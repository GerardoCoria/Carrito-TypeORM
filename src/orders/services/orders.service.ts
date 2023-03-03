import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AuthService } from '../../auth/services/auth.service';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/orders.dto';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersService {

  constructor(@InjectRepository(Order) private orders:Repository<Order>){}

  findAll() {
    return this.orders.find();
  }

  async findOne(id: number) {
    const order = await this.orders.findOne({
      where:{id:id}
    });
    if (!order) {
      throw new NotFoundException(`Marca #${id} no encontrada`);
    }
    return order;
  }

  ordersCustomer
  oneByCustomer
  oneItemFromOrder

  create(payload: /* CreateOrderDto */ any) {
    const newOrder = this.orders.create(payload);
    return this.orders.save(newOrder)
  }

  async update(id: number, payload: UpdateOrderDto) {
    const order = await this.orders.findOneBy({id:id});
    this.orders.merge(order, payload);
    return this.orders.save(order);
  }

  async remove(id: number) {
    const findOrder = await this.findOne(id)
    if(!findOrder){
      throw new BadRequestException(`Order con #${id} no encontrada`);
    }
    return this.orders.delete({id:id})
  }
}
