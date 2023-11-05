import { Prop, SchemaFactory,Schema } from "@nestjs/mongoose";
import {Document, Schema as MongooseSchema}from 'mongoose'

export type UserDocument = User & Document



@Schema({
    timestamps:true
})
export class User {

    @Prop()
    name:string

    @Prop()
    email:string

    @Prop()
    contact:number

    @Prop()
    password:string


    @Prop({type:MongooseSchema.Types.Array})
    all_address:[{
        address:string,
        city:string,
        state:string,
        pincode:number
    }]

    // @Prop({type:MongooseSchema.Types.Array})
    // secondary_Address:[s_address:string]

    @Prop()
    city:string

    @Prop()
    state:string

    @Prop()
    pincode:number

    @Prop()
    profileImg:string
}

export const UserSchema = SchemaFactory.createForClass(User)