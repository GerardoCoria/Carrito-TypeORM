import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AuthService } from '../../auth/services/auth.service';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/orders.dto';
import { Order } from '../entities/order.entity';
import { Customer } from '../../users/entities/customer.entity';
import { CustomerService } from 'src/users/services/customer.service';

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order) private orders:Repository<Order>,
    @InjectRepository(Customer) private customers:Repository<Customer>
    //private customers:CustomerService
    //private authService:AuthService
  ){}

  findAll() {
    return this.orders.find();
  }

  async findOne(id: number) {
    const order = await this.orders.findOne({
      where:{id:id},
      relations:['customer', 'items', 'items.product']
    });
    if (!order) {
      throw new NotFoundException(`Orden #${id} no encontrada`);
    }
    return order;
  }

  ordersCustomer;
  oneByCustomer;
  oneItemFromOrder

  async create(payload: CreateOrderDto) {
    const order = new Order();
    if(!payload.customerId){
      throw new NotFoundException(`Cliente #${payload.customerId} no encontrado`);
    }
    const customer = await this.customers.findOne({
      where:{id:payload.customerId},
    });
    order.customer = customer;
    return this.orders.save(order);
  }

  async update(id: number, payload: UpdateOrderDto) {
    const order = await this.orders.findOneBy({id:id});
    if(payload.customerId){
      const customer = await this.customers.findOne({
        where:{id:payload.customerId},
      });
      order.customer = customer;
    }
    return this.orders.save(order);
  }

  async remove(id: number) {
    const findOrder = await this.findOne(id)
    if(!findOrder){
      throw new BadRequestException(`Orden con #${id} no encontrada`);
    }
    return this.orders.delete({id:id})
  }
}
