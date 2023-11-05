import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {User, UserDocument}from "./user.schema"
import {Model} from "mongoose"
import { InjectModel } from '@nestjs/mongoose';
const md5 = require('md5')
import {JwtService}from '@nestjs/jwt'
import { retry } from 'rxjs';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private userModel:Model<UserDocument>,
    private jwtService:JwtService
    ){

  }

  //sign-in
  async create(createUserDto: CreateUserDto) :Promise<{token:string}> {

    const hashPassword = await md5(createUserDto.password)

    const model = new this.userModel();

    model.name = createUserDto.name;
    model.email = createUserDto.email;
    model.contact = createUserDto.contact;
    model.password = hashPassword
    // model.address = createUserDto.address;
    model.all_address = createUserDto.all_address
    // model.secondary_Address = createUserDto.secondary_Address;
    model.city = createUserDto.city;
    model.state = createUserDto.state;
    model.pincode = createUserDto.pincode;
    model.profileImg = createUserDto.profileImg;

    const token = this.jwtService.sign({id:model._id})
    const data = model.save()
    // return model.save();
    return {token:token}
  }

  //login
  async login(email:string, password:string) {

    const authEmail = await this.userModel.findOne({email:email}).exec()
    if(!authEmail){
      return "invalid Email"
    }
    
    const hashPassword = md5(password)
    const authPass = await this.userModel.findOne({password:hashPassword}).exec()
    if(!authPass){
      return "Invalid Password"
    }

    const token = this.jwtService.sign({id:authEmail._id})

    return {
      mess:"login",
      data:authEmail,
      token}
  }  

  findAll() :Promise<User[]>{
    return this.userModel.find().exec();
  }

  findOne(id: string) {
    return this.userModel.findById(id).exec();
  }




  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne({_id:id},
      {
        // address:updateUserDto.address,
        $push:{all_address:updateUserDto.all_address},
        // $push:{secondary_Address:updateUserDto.secondary_Address},
        city:updateUserDto.city,
        state:updateUserDto.state,
        pincode:updateUserDto.pincode,
        profileImg:updateUserDto.profileImg
      }).exec();
  }



  async deleteAddress(param,updateUserDto: UpdateUserDto){
    return this.userModel.updateOne({_id:param.id},{
      $unset:{[`all_address.${param.ind}`]:""}, // set the value of the element at index 1 to null
      // remove all null elements from the array
    }).then((x)=>{
      return this.userModel.updateOne({_id:param.id},{
        $pull:{"all_address":null}
      })
    })
  }

  updateOneAddress(param, updateUserDto: UpdateUserDto){
    return this.userModel.updateOne({_id:param.id},{
      $set:{[`all_address.${param.index}`]:updateUserDto}
    })
  }


  //Delete Img
  updateImg(id:string, updateUserDto: UpdateUserDto){
    return this.userModel.updateOne({_id:id},
      {$unset: { profileImg: ""} }).exec()
      
  }


  async uploadImage(image:Express.Multer.File, id:string){

    return this.userModel.updateOne({_id:id},{
      profileImg:image.filename
    })
    // return image
    
  }
  
  remove(id: string) {
    return this.userModel.deleteOne({_id:id}).exec();
  }
}