import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError, exhaustMap, tap } from 'rxjs/operators';
import { NotificationRecipientService } from '../../../../services';
import * as RecipientsActions from '../actions';
import { FeedbackService } from 'app/common/helpers/feedback.service';

@Injectable()
export class NotificationRecipientsEffects {
    constructor(
        private actions$: Actions,
        private router: Router,
        private recipientsService: NotificationRecipientService,
        private feedbackService: FeedbackService
    ) {}

    loadRecipients$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RecipientsActions.loadNotificationRecipients),
            mergeMap(() =>
                this.recipientsService.getAllNotificationRecipients().pipe(
                    map((payload) =>
                        RecipientsActions.loadNotificationRecipientsSuccess({
                            payload: payload,
                        })
                    ),
                    catchError((error) =>
                        of(
                            RecipientsActions.setFeedback({
                                payload:
                                    this.feedbackService.processResponse(error),
                            })
                        )
                    )
                )
            )
        )
    );

    addRecipient$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RecipientsActions.addNotificationRecipient),
            exhaustMap((action) =>
                this.recipientsService
                    .addNotificationRecipient(action.payload)
                    .pipe(
                        map((data) =>
                            RecipientsActions.addNotificationRecipientSuccess({
                                payload: data,
                            })
                        ),
                        catchError((error) =>
                            of(
                                RecipientsActions.setFeedback({
                                    payload:
                                        this.feedbackService.processResponse(
                                            error
                                        ),
                                })
                            )
                        )
                    )
            )
        )
    );

    addRecipientSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(RecipientsActions.addNotificationRecipientSuccess),
                tap(() => {
                    this.router.navigateByUrl(
                        '/dashboard/notification-recipients'
                    );
                })
            ),
        { dispatch: false }
    );

    deleteRecipient$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RecipientsActions.deleteNotificationRecipient),
            exhaustMap((action) =>
                this.recipientsService
                    .deleteNotificationRecipient(action.payload)
                    .pipe(
                        map((data) =>
                            RecipientsActions.deleteNotificationRecipientSuccess(
                                {
                                    payload: data,
                                }
                            )
                        ),
                        catchError((error) =>
                            of(
                                RecipientsActions.setFeedback({
                                    payload:
                                        this.feedbackService.processResponse(
                                            error
                                        ),
                                })
                            )
                        )
                    )
            )
        )
    );
}
