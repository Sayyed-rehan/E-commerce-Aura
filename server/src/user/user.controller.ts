import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.schema';
import {FileInterceptor}from "@nestjs/platform-express"
import {diskStorage}from 'multer'
import {extname}from 'path'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) :Promise<{token:string}>{
    return this.userService.create(createUserDto);
  }

  //post
  @Post("/login")
  login(@Body() createUserDto: CreateUserDto){
    return this.userService.login(createUserDto.email, createUserDto.password)
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }




  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }


  // //Delete one adress
  // @Patch("/deleteAddress/:id")
  // deleteAddress(@Param('id') id:string, index:string, @Body() updateUserDto: UpdateUserDto){
  //   return this.userService.deleteAddress(id, updateUserDto)
  // }


  //Delete one adress
  @Patch("/deleteAddress/:id/:ind")
  deleteAddress(@Param() param:{id:string, ind:string}, @Body() updateUserDto: UpdateUserDto){
    return this.userService.deleteAddress({...param}, updateUserDto)
  }
  
  //update one address
  @Patch("/updateOneAddress/:id/:index")
  updateOneAddress(@Param() param:{id:string, index:string}, @Body() updateUserDto: UpdateUserDto){
    return this.userService.updateOneAddress({...param}, updateUserDto)
  }
  

  //update Img
  @Patch('/deleteImg/:id/')
  updateImg(@Param('id') id:string, @Body() updateUserDto: UpdateUserDto){
    return this.userService.updateImg(id, updateUserDto)
  }


  //upload img
  @Post('/uploadImg/:id')
  @UseInterceptors(
    FileInterceptor('image',{
      storage:diskStorage({
        destination:'./uploads',
        filename:(req,file, callback)=>{
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = extname(file.originalname);
          callback(null, file.fieldname + '-' + uniqueSuffix + extension)
        },
      }),
    }),
  )
  async uploadImage(@UploadedFile() image:Express.Multer.File, @Param('id') id:string){
    return this.userService.uploadImage(image, id)
  }
  



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}