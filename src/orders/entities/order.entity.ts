import { CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Exclude, Expose } from "class-transformer";

import { Customer } from "../../users/entities/customer.entity";
import { OrderItem } from "./order-item.entity";

@Entity({name: 'orders'})
export class Order{
  @PrimaryGeneratedColumn()
  id:number;

  @Exclude()
  @CreateDateColumn({
    type:'timestamptz',
    default: ()=> 'CURRENT_TIMESTAMP',
  })
  createdAt:Date;

  @Exclude()
  @UpdateDateColumn({
    type:'timestamptz',
    default: ()=> 'CURRENT_TIMESTAMP',
  })
  updatedAt:Date;

  @ManyToOne(()=> Customer, (customer)=> customer.orders)
  customer:Customer;

  @Exclude()
  @OneToMany(()=>OrderItem, (items)=>items.order)
  items:OrderItem[];

  @Expose()
  get products(){
    if(this.items){
      return this.items
        .filter((item)=>!!item)
        .map((item)=>({
          ...item.product,
          quantity:item.quantity
        }))
    }
  }

  @Expose()
  get total(){
    if(this.items){
      return this.items
        .filter((item)=>!!item)
        .reduce((total, item)=>{
          const totalItem = item.product.price * item.quantity;
          return total + totalItem
        },0)
    }
  }
}
