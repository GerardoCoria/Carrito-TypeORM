import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateOrderItemDto } from '../dtos/order-item.dto';
import { OrdenItemService } from '../services/orden-item.service';

@ApiTags('Orders Items')
//@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('orden-item')
export class OrdenItemController {

  constructor(private itemServices:OrdenItemService){}

  @Post()
  @ApiOperation({summary: "Agrega nuevos items a una orden"})
  create(@Body() payload: CreateOrderItemDto) {
    return this.itemServices.create(payload);
  }
}
