import {Schema as MongooseSchema}from "mongoose"

export class CreateUserDto {

    name:string;
    email:string;
    contact:number;
    password:string;
    // address:string;
    all_address:[{
        address:string,
        city:string,
        state:string,
        pincode:number
    }]
    // secondary_Address:[s_address:string];
    city:string;
    state:string;
    pincode:number;
    profileImg:string

}