import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Client } from 'pg';
import { Repository } from 'typeorm';

import { CreateUserDto, UpdateUserDto} from '../dtos/user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private users:Repository<User>
     //@Inject('PG') private clientPg: Client,
    ){}


  //getInfoDB(){
  //  return new Promise((resolve, reject) => {
  //    this.clientPg.query('SELECT * FROM tasks', (err, res) => {
  //      if (err) {
  //        reject(err);
  //      }
  //      resolve(res.rows);\
  //    });
  //  });
  //}

  findAll() {
    return this.users.find();
  }

  async findOne(id: string) {
    const user = await this.users.findOneBy({email:id});
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  findByEmail

  async create(payload: CreateUserDto) {
    const findUser = await this.findOne(payload.email)
    if(findUser){
      throw new BadRequestException(`Usuario con mail ${payload.email} ya ingresado`)
    }
    const newUser = this.users.create(payload)
    return this.users.save(newUser)
  }

  async update(id: number, payload: UpdateUserDto) {
    const user = await this.users.findOneBy({id:id});
    this.users.merge(user, payload);
    return this.users.save(user);
  }

  async remove(id: string) {
    const findUser = await this.findOne(id)
    if(!findUser){
      throw new BadRequestException(`User #${id} not found`);
    }
    return this.users.delete(id)
  }
}
