import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateOrderItemDto, UpdateOrderItemDto } from "../dtos/order-item.dto";
import { Order } from '../entities/order.entity';
import { OrderItem } from "../entities/order-item.entity";
import { Product } from "../../products/entities/product.entity";

@Injectable()
export class OrdenItemService {

  constructor(
    @InjectRepository(Order) private orders:Repository<Order>,
    @InjectRepository(OrderItem) private orderItems:Repository<OrderItem>,
    @InjectRepository(Product) private products:Repository<Product>,
  ){}

  //get(){}

  async create(payload:CreateOrderItemDto){
    const order = await this.orders.findOne({
      where:{id:payload.orderId}
    });
    const product = await this.products.findOne({
      where:{id:payload.productId}
    });
    const item = new OrderItem();
    item.order = order;
    item.product = product;
    item.quantity = payload.quantity;
    return this.orderItems.save(item);
  }

  //update(){}

  //delete(){}

}
