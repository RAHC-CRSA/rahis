import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, tap, switchMap, first } from 'rxjs';
import { UserModel as User } from 'src/app/models';
import { AuthState, getUser } from '../store/reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(private store: Store<AuthState>) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return this.store.select(getUser).pipe(first(), switchMap((user) => {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${user?.authToken}`)
      });

      return next.handle(authReq);
    }));

  }
}
