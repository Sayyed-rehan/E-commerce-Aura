import {IsInt, Min}from "@nestjs/class-validator"

export {IsInt, Min} from "@nestjs/class-validator"

export class PaginationDto{
    @IsInt()
    @Min(1)
    page:number

    @IsInt()
    @Min(1)
    limit:number


}