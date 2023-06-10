import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    CreateReportClient,
    CreateReportCommand,
    DeleteOccurrenceClient,
    DeleteOccurrenceCommand,
    DeleteReportClient,
    DeleteReportCommand,
    GetOccurrencesClient,
    GetReportClient,
    GetReportsClient,
    ICreateReportCommand,
    IDeleteOccurrenceCommand,
    IDeleteReportCommand,
} from '../web-api-client';

@Injectable({
    providedIn: 'root',
})
export class ReportService {
    // Clients
    getOccurrencesClient: GetOccurrencesClient;
    createReportClient: CreateReportClient;
    getReportsClient: GetReportsClient;
    getReportClient: GetReportClient;
    deleteReportClient: DeleteReportClient;
    deleteOccurrenceClient: DeleteOccurrenceClient;

    constructor(http: HttpClient) {
        this.getOccurrencesClient = new GetOccurrencesClient(http);
        this.createReportClient = new CreateReportClient(http);
        this.getReportsClient = new GetReportsClient(http);
        this.getReportClient = new GetReportClient(http);
        this.deleteReportClient = new DeleteReportClient(http);
        this.deleteOccurrenceClient = new DeleteOccurrenceClient(http);
    }

    getAllOccurrences() {
        return this.getOccurrencesClient.handle();
    }

    createReport(payload: ICreateReportCommand) {
        const request = new CreateReportCommand(payload);

        return this.createReportClient.handle(request);
    }

    getAllReports() {
        return this.getReportsClient.handle();
    }

    getReport(id: number) {
        return this.getReportClient.handle(id);
    }

    deleteReport(payload: IDeleteReportCommand) {
        return this.deleteReportClient.handle(new DeleteReportCommand(payload));
    }

    deleteOccurrence(payload: IDeleteOccurrenceCommand) {
        return this.deleteOccurrenceClient.handle(
            new DeleteOccurrenceCommand(payload)
        );
    }
}
