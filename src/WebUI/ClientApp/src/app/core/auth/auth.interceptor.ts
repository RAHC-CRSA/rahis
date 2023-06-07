import { Injectable } from '@angular/core';
import {
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
import { checkTokenExpiration } from './store/actions/auth.actions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router, private store: Store<AuthState>) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return this.store.select(getUser).pipe(
            first(),
            tap(() => this.store.dispatch(checkTokenExpiration())),
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
