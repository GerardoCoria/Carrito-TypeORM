import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable} from "typeorm";
import { Exclude } from "class-transformer";

import { Brand } from "./brand.entity";
import { Category } from "./category.entity";

@Entity({name: 'products'})
export class Product{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type: 'varchar', length: 255, unique: true})
  name: string;

  @Column({type: 'text'})
  description: string;

  @Column({type: 'int'})
  price: number;

  @Column({type: 'int'})
  stock:number;

  @Column({type: 'date'})
  expires:Date;

  @Column({type: 'varchar', length: 255})
  batch:string;

  @Column({type: 'varchar'})
  image:string;

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

  @ManyToOne(()=> Brand, (brand)=> brand.products)
  brand:Brand;

  @ManyToMany(()=> Category, (category)=>category.products)
  @JoinTable()
  category:Category[]
}
