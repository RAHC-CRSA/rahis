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
            feedback.isError = response.isError;
            feedback.summary = response.summary;
            feedback.errors = response.errors;
        }

        console.log({ response, feedback });

        return feedback;
    }
}
