import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { first, Observable, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from './store';
import { getUser } from './store/selectors';
import { checkTokenExpiration, logout } from './store/actions/auth.actions';

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
                            this.store.dispatch(checkTokenExpiration());
                            if (error instanceof HttpErrorResponse) {
                                if (error.status === 401) {
                                    const payload = this.router.url;
                                    this.store.dispatch(logout({ payload }));
                                }
                            }
                        }
                    )
                );
            })
        );
    }
}
