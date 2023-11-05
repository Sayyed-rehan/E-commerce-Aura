import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {MongooseModule}from '@nestjs/mongoose'
import {User, UserSchema}from "./user.schema"
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
// import { config } from 'process';

@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.registerAsync({
      inject:[ConfigService],
      useFactory:(config:ConfigService)=>{
        return{
          secret:config.get<string>('JWT_SECRECT'),
          signOptions:{
            expiresIn:config.get<string | number>('JWT_EXPIRE')
          }
        }
      }
    }),
    
    MongooseModule.forFeature([{name:User.name, schema:UserSchema}])],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports:[JwtStrategy, PassportModule]
})
export class UserModule {}