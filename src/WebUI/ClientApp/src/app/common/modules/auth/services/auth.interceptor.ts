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
import { logout } from '../store/actions/auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private store: Store<AuthState>) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(getUser).pipe(
      first(),
      switchMap((user) => {
        if (!user) {
          this.store.dispatch(logout());
        }

        const authReq = req.clone({
          headers: req.headers.set(
            'Authorization',
            `Bearer ${user?.authToken}`
          ),
        });

        return next.handle(authReq).pipe(
          tap(
            (event: HttpEvent<any>) => {},
            (error) => {
              if (error.status === 401) {
                this.router.navigateByUrl('401');
              }
            }
          )
        );
      })
    );
  }
}
