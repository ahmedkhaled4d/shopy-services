import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller({ path: 'orders', version: '1' })
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  list(): string {
    return 'API: function not implemented';
  }

  @Get('/:id')
  one(): string {
    return 'API: function not implemented';
  }

  @Put('/:id')
  update(): string {
    return 'API: function not implemented';
  }

  @Delete('/:id')
  delete(): string {
    return 'API: function not implemented';
  }

  @Post('/:id')
  print(): string {
    return 'API: function not implemented';
  }

  @Post('')
  create(): string {
    return 'API: function not implemented';
  }
}
