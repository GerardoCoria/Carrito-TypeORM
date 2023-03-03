import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Product } from "../../products/entities/product.entity";
import { Order } from "./order.entity";

@Entity({name: 'order-items'})
export class OrderItem{
  @PrimaryGeneratedColumn()
  id:number;

  @CreateDateColumn({
    type:'timestamptz',
    default: ()=> 'CURRENT_TIMESTAMP',
  })
  createdAt:Date;

  @UpdateDateColumn({
    type:'timestamptz',
    default: ()=> 'CURRENT_TIMESTAMP',
  })
  updatedAt:Date;

  @Column({type: 'int'})
  quantity:number;

  @ManyToOne(()=>Product)
  product:Product;

  @ManyToOne(()=>Order, (order)=>order.items)
  order:Order;
};
