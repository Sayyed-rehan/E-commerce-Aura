import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './order.schema';
import {Model} from "mongoose"


@Injectable()
export class OrderService {

  constructor(
    @InjectModel(Order.name) private orderModel:Model<OrderDocument>){

  }


  create(createOrderDto: CreateOrderDto) :Promise<Order>{

    const model = new this.orderModel()

    model.product_details = createOrderDto.product_details;
    model.user_id = createOrderDto.user_id;
    model.total_price = createOrderDto.total_price;
    model.order_date = createOrderDto.order_date;
    model.expected_delivery = createOrderDto.expected_delivery;
    model.ship_address = createOrderDto.ship_address;
    model.payment_method = createOrderDto.payment_method;
    model.delivery_status = createOrderDto.delivery_status;

    return model.save();
  }

  findAll() :Promise<Order[]>{
    return this.orderModel.find().exec();
  }

 

  

  findById(id: string) {
    return this.orderModel.findById(id);
  }

  //find by user_id
  findbyUserId(user_id:string){
    return this.orderModel.find({user_id:user_id}).sort({createdAt:-1})
  }

  //pagination data
  async getPaginatedData(query){
    const offset = (query.page-1)*query.limit
    const data = await this.orderModel.find({user_id:query.user_id}).sort({createdAt:-1}).skip(offset).limit(query.limit)
    return data
  } 

 

  //find by status
  findByStatus(query){
    return this.orderModel.find({delivery_status:query.status})
  }

  

  update(id: string, updateOrderDto: UpdateOrderDto) {

    return this.orderModel.updateOne({_id:id},
      {
        product_details:updateOrderDto.product_details,
        user_id:updateOrderDto.user_id,
        total_price:updateOrderDto.total_price,
        order_date:updateOrderDto.order_date,
        expected_delivery:updateOrderDto.expected_delivery,
        ship_address:updateOrderDto.ship_address,
        payment_method:updateOrderDto.payment_method,
        delivery_status:updateOrderDto.delivery_status
      });
  }

  //delete Item from product array
  // deleteItem(id:string, updateOrderDto: UpdateOrderDto){
  //   return this.orderModel.updateOne({_id:id}, {
  //     $pull:{product_details:{product_id:pid}}
  //   })
  // }
  deleteItem(param, updateOrderDto: UpdateOrderDto){
    return this.orderModel.updateOne({_id:param.id},
      {
        $pull:{product_details:{product_id:param.pid}}
      })
  }

  // update order status
  updateOrderStatus(param,updateOrderDto: UpdateOrderDto){
    const date1 = new Date("2020-08-01T07:05:00Z")
    const delivery_date = new Date()
    if(date1<delivery_date){
      return this.orderModel.updateOne({_id:param.oid},{
        $set:{delivery_status:"Pending"}
      })
    }if(date1>delivery_date){
      return this.orderModel.updateOne({_id:param.oid},{
        $set:{delivery_status:"delivered"}
      })
    }
  }

  remove(id: string) {
    return this.orderModel.deleteOne({_id:id});
  }
}