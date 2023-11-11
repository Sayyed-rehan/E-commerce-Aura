import { Module } from "@nestjs/common";
import { ConfigModule,ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./user/user.module";
import { ProductModule } from "./product/product.module";
import { OrderModule } from "./order/order.module";
import {ServeStaticModule} from "@nestjs/serve-static"
import { join } from "path";

@Module({
  imports:[
    ServeStaticModule.forRoot({rootPath:join(__dirname, "../..", 'client', 'dist')}),
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:[".local.env"]
    }),
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      useFactory:(configService:ConfigService)=>({uri:configService.get("MONGO_URL")}),
      inject:[ConfigService]
    }),
    UserModule,
    ProductModule,
    OrderModule
  ],
  controllers:[],
  providers:[],
})
export class AppModule{
  constructor(){
    console.log("Server started at 5000....");
    
  }
}