import { BadRequestException, Inject, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Client } from 'pg';
import { Repository } from 'typeorm';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from "../dtos/customer.dto";

@Injectable()
export class CustomerService {

  constructor(
    @InjectRepository(Customer) private customers:Repository<Customer>
  ){}

  findAll() {
    return this.customers.find();
  }

  async findOne(id: number) {
    const customer = await this.customers.findOneBy({id:id});
    if (!customer) {
      throw new NotFoundException(`Cliente #${id} no encontrado`);
    }
    return customer;
  }

  async create(payload: CreateCustomerDto) {
    //const findCustomer = await this.findOne(payload.id)
    //if(findCustomer){
    //  throw new BadRequestException(`Usuario con mail ${payload.id} ya ingresado`)
    //}
    const newCustomer = this.customers.create(payload)
    return this.customers.save(newCustomer)
  }

  async update(id: number, payload: UpdateCustomerDto) {
    const customer = await this.customers.findOneBy({id:id});
    this.customers.merge(customer, payload);
    return this.customers.save(customer);
  }

  async remove(id: number) {
    const findCustomer = await this.findOne(id)
    if(!findCustomer){
      throw new BadRequestException(`Cliente #${id} no encontrado`);
    }
    return this.customers.delete(id)
  }
}
