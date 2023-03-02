import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, ManyToMany} from "typeorm";

import { Product } from "./product.entity";
//export enum CategoryName{
//  BEBIDAS='Bebidas',
//  ALMACEN='Almacén',
//  LACTEOS='Lácteos',
//  LIMPIEZA='Limpieza',
//  PERFUMERIA='Limpieza',
//  CONGELADOS='Congelados'
//}

@Entity({name: 'categories'})
export class Category{

  @PrimaryGeneratedColumn()
  id:number;

  @Column({type: 'varchar', length: 255, unique: true})
  name: string;

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

  @ManyToMany(()=>Product, (product)=>product.category)
  products:Product[]
}
