import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ToWorkDto } from './dto/to-work.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { SetRatingDto } from './dto/set-rating.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Patch('/:id/set-rating')
  setRating(@Param('id', ParseIntPipe) id: number, @Body() dto: SetRatingDto) {
    return this.orderService.setRating(id, dto.rating);
  }

  @Get('/stop')
  findAllStop() {
    return this.orderService.findAllStop();
  }

  @Get('/completed')
  findAllCompleted() {
    return this.orderService.findAllCompleted();
  }

  @Get('/completed-reclamations')
  findAllCompletedReclamations() {
    return this.orderService.findAllCompletedReclamations();
  }

  @Get('/break')
  findAllBreak() {
    return this.orderService.findAllBreak();
  }

  @Get('/new')
  findAllNew() {
    return this.orderService.findAllNew();
  }

  @Get('/in-work')
  findAllInWork() {
    return this.orderService.findAllInWork();
  }

  @Get('/:id')
  info(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.info(id);
  }

  @Patch('/:id/set-work')
  setWork(@Param('id', ParseIntPipe) id: number, @Body() toWorkDto: ToWorkDto) {
    return this.orderService.setWork(id, toWorkDto);
  }

  @Patch('/:id/restore')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.restore(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Patch('/:id/complete')
  setComplete(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.setComplete(id);
  }

  @Patch('/:id/stop')
  setStop(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.setStop(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.remove(id);
  }
}
