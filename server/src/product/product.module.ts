import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import {MongooseModule}from '@nestjs/mongoose'
import { Product, ProductSchema } from './product.schema';
import { UserModule } from 'src/user/user.module';
import { PaginationInterceptor } from 'src/ass';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports:[
    UserModule,
    MongooseModule.forFeature([{name:Product.name, schema:ProductSchema}])],
  controllers: [ProductController],
  providers: [ProductService,
  // APP_INTERCEPTOR,
  PaginationInterceptor]
})
export class ProductModule {}