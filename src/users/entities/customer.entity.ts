import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToMany, OneToOne } from "typeorm";

import { Order } from "../../orders/entities/order.entity";
import { User } from "./user.entity";

@Entity({name: 'customers'})
export class Customer{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type: 'varchar', length: 255, unique: true})
  name:string;

  @Column({type: 'varchar', length: 255, unique: true})
  lastname:string;

  @Column({type: 'varchar', length: 255, unique: true})
  phone:string;

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

  @OneToOne(() => User, (user) => user.customer, { nullable: true })
  user: User;

  @OneToMany(()=> Order, (order)=> order.customer)
  orders:Order[];
}
