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
    IVerifyReportCommand,
    VerifyReportClient,
    VerifyReportCommand,
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
    verifyReportClient: VerifyReportClient;
    deleteReportClient: DeleteReportClient;
    deleteOccurrenceClient: DeleteOccurrenceClient;

    constructor(http: HttpClient) {
        this.getOccurrencesClient = new GetOccurrencesClient(http);
        this.createReportClient = new CreateReportClient(http);
        this.getReportsClient = new GetReportsClient(http);
        this.getReportClient = new GetReportClient(http);
        this.verifyReportClient = new VerifyReportClient(http);
        this.deleteReportClient = new DeleteReportClient(http);
        this.deleteOccurrenceClient = new DeleteOccurrenceClient(http);
    }

    getAllOccurrences() {
        return this.getOccurrencesClient.handle();
    }

    createReport(payload: ICreateReportCommand) {
        return this.createReportClient.handle(new CreateReportCommand(payload));
    }

    getAllReports(verified: boolean) {
        return this.getReportsClient.handle(verified);
    }

    getReport(id: number) {
        return this.getReportClient.handle(id);
    }

    verifyReport(payload: IVerifyReportCommand) {
        return this.verifyReportClient.handle(new VerifyReportCommand(payload));
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
