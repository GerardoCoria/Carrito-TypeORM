import { Body, Controller, Get, Param, Post, Put, Delete} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { CustomerService } from '../services/customer.service';
import { ParseIntPipe } from "../../common/parse-int.pipe";

@ApiTags('Clientes')
@Controller('customer')
export class CustomersController {
  constructor(private customerService: CustomerService) {}

  @Get()
  @ApiOperation({summary: ""})
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: ""})
  get(@Param('id',ParseIntPipe) id: number) {
    return this.customerService.findOne(id);
  }

  @Post()
  @ApiOperation({summary: ""})
  create(@Body() payload: CreateCustomerDto) {
    return this.customerService.create(payload);
  }

  @Put(':id')
  @ApiOperation({summary: ""})
  update(@Param('id') id: number, @Body() payload: UpdateCustomerDto) {
    return this.customerService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({summary: ""})
  remove(@Param('id') id: number) {
    return this.customerService.remove(id);
  }
}
