import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PaginationDto } from 'src/product/dto/Pagination.dto';
// import { query } from 'express';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get('findById/:id')
  findOne(@Param('id') id: string) {
    return this.orderService.findById(id);
  }


  //find by user_id
  @Get("findbyUserid/:user_id")
  findbyUserId(@Param('user_id') user_id:string){
    return this.orderService.findbyUserId(user_id)
  }

  // @Get("findbyUserIdPagination/:user_id")
  // async findbyUserIdPagination(@Param('user_id') user_id:string, @Query() paginationDto:PaginationDto){
  //   const {page,limit} = paginationDto
  //   const data = await this.orderService.getPaginatedData(user_id,page,limit)
  //   return data
  // }


  
  @Get("/findbyUserIdPagination")
  async findbyUserIdPagination(@Query() query:{user_id:string, page:number, limit:number}){
    // const {page,limit} = paginationDto
    const data = await this.orderService.getPaginatedData({...query})
    return data
  }

  // find by status
  @Get('/findByStatus/')
  findByStatus(@Query() query:{id:string, status:string}){
    return this.orderService.findByStatus({...query})
  }


 
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  //delete Item from product array
  // @Patch('/deleteItem/:id')
  // deleteItem(@Param('id') id:string, @Query('pid') pid:string, @Body() updateOrderDto: UpdateOrderDto){
  //   return this.orderService.deleteItem(id, updateOrderDto)
  // }

  @Patch('/deleteItem/:id/:pid')
  deleteItem(@Param() param:{id:string, pid:string}, @Body() updateOrderDto: UpdateOrderDto){
    return this.orderService.deleteItem({...param}, updateOrderDto)
  }

  @Patch('/updateStatus/:oid/:expected')
  updatOrder(@Param() param:{oid:string, expected:string}, @Body()updateOrderDto: UpdateOrderDto){
    return this.orderService.updateOrderStatus({...param}, updateOrderDto)
  }


  //update status as cancelled
  // @Patch("/cancel-order/:oid")
  // cancelOrder(@Param('oid') oid:string, @Body() updateOrderDto: UpdateOrderDto){
  //   return this.orderService.cancelOrder(oid, updateOrderDto)
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}