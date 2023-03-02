import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn} from "typeorm";

import { Brand } from "../entities/brand.entity";
import { Category, CategoryName } from "../entities/category.entity";

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

  /**
   * !ver PARA MODIFICAR
   * */
  //@Column({type: 'enum', enum: CategoryName, nullable: true,})
  //category: CategoryName;

  @Column({type: 'varchar', length: 255})
  brand: string;

  @Column({type: 'date'})
  expires:Date;

  @Column({type: 'varchar', length: 255})
  batch:string;

  @Column({type: 'varchar'})
  image:string;

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
}
