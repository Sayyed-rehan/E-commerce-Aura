import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { InjectModel } from "@nestjs/mongoose";
import {PassportStrategy} from '@nestjs/passport'
import { User, UserDocument } from "./user.schema";
import {Model} from "mongoose"
import {Strategy, ExtractJwt}from 'passport-jwt'


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectModel(User.name) 
        private userModel:Model<User>
    ){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:process.env.JWT_SECRECT
        })
    }

    async validate(payload){
        const {id} = payload

        const user  = await this.userModel.findById(id)

        if(!user){
            return{
                mess:"login first to acees this endpoints"
            }

            return user
        }
    }
}