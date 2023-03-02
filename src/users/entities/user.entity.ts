import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class User{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type: 'varchar', length: 255, unique: true})
  name:string;

  @Column({type: 'varchar', length: 255, unique: true})
  lastname:string;

  @Column({type: 'varchar', length: 255, unique: true})
  email:string;

    /**
   *  !ENCRIPTAR
   * */
  @Column({type: 'varchar', length: 255, unique: true})
  password:string;

  @Column({type: 'varchar', length: 255, unique: true})
  phone:string;

  @Column({type: 'varchar', length: 255, unique: true})
  role: string;

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
