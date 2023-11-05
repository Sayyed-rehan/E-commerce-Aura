import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';

import { Observable } from 'rxjs';

 

@Injectable()

export class PaginationInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    // Access the request object

    const request = context.switchToHttp().getRequest();

    

    // Get the pagination query parameters

    const { page, limit } = request.query;

    

    // Set default values if the query parameters are not provided

    const pageNumber = page ? Number(page) : 1;

    const pageSize = limit ? Number(limit) : 6;

 

    // Modify the request object to include the pagination details

    request.pagination = {

      page: pageNumber,

      limit: pageSize,

      skip: (pageNumber - 1) * pageSize,

    };

 

    return next.handle();

  }

}