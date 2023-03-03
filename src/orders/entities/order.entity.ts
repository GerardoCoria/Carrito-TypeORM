import { CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";

import { Customer } from "../../users/entities/customer.entity";
import { OrderItem } from "./order-item.entity";

@Entity({name: 'orders'})
export class Order{
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

  @ManyToOne(()=> Customer, (customer)=> customer.orders)
  customer:Customer;

  @OneToMany(()=>OrderItem, (items)=>items.order)
  items:OrderItem[];
}
