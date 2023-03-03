import { Body, Controller, Get, Param, Post, Put, Delete} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { CustomerService } from '../services/customer.service';
import { ParseIntPipe } from "../../common/parse-int.pipe";

@ApiTags('Clientes')
@Controller('customer')
export class CustomersController {
  constructor(private customerService: CustomerService) {}

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  get(@Param('id',ParseIntPipe) id: number) {
    return this.customerService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateCustomerDto) {
    return this.customerService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateCustomerDto) {
    return this.customerService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.customerService.remove(id);
  }
}
