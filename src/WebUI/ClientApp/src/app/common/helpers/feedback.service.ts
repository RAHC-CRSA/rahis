import { Injectable } from '@angular/core';
import { ServerResponse } from 'app/web-api-client';

@Injectable({
    providedIn: 'root',
})
export class FeedbackService {
    constructor() {}

    processResponse(response: any) {
        let feedback: ServerResponse = new ServerResponse();
        if (response.isSwaggerException) {
            feedback.isError = true;
            feedback.summary = response.message;
            feedback.errors = [response.message];
        } else {
            const errors = this._processErrors(response.errors);
            feedback.isError = response.isError ?? true;
            feedback.summary =
                response.summary ?? 'Oops! Something went wrong.';
            feedback.errors = errors;
        }

        console.log({ response, feedback });

        return feedback;
    }

    private _processErrors(responseErrors: any) {
        let errors = [];
        for (let error in responseErrors) {
            let err = `${responseErrors[error].map(
                (e, i) =>
                    `${e}${i < responseErrors[error].length - 1 ? ', ' : ''}`
            )}`;
            errors.push(err);
        }

        return errors;
    }
}
