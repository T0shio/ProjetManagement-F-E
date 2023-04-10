import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = UserService.getToken()
    if(token && !request.url.includes("login")) {
      let clone = request.clone({ headers: request.headers.set("Authorization", "Bearer " + token)})
    //   clone.headers.set('Authorization' , 'Bearer '+token)
      return next.handle(clone)
    }
    return next.handle(request);
  }
}
