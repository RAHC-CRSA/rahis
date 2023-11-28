import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    CreateReportClient,
    CreateReportCommand,
    DataQueryTimeSpan,
    DeleteOccurrenceClient,
    DeleteOccurrenceCommand,
    DeleteReportClient,
    DeleteReportCommand,
    GetOccurrencesClient,
    GetPublicReportsClient,
    GetReportClient,
    GetReportsAnalyticsClient,
    GetReportsClient,
    ICreateReportCommand,
    IDeleteOccurrenceCommand,
    IDeleteReportCommand,
    ISendNotificationCommand,
    IVerifyReportCommand,
    SendNotificationClient,
    SendNotificationCommand,
    VerifyReportClient,
    VerifyReportCommand,
} from '../web-api-client';

@Injectable({
    providedIn: 'root',
})
export class ReportService {
    // Clients
    private getOccurrencesClient: GetOccurrencesClient;
    private createReportClient: CreateReportClient;
    private getReportsClient: GetReportsClient;
    private getReportClient: GetReportClient;
    private verifyReportClient: VerifyReportClient;
    private deleteReportClient: DeleteReportClient;
    private deleteOccurrenceClient: DeleteOccurrenceClient;
    private sendNotificationClient: SendNotificationClient;
    private getReportsAnalyticsClient: GetReportsAnalyticsClient;
    private getPublicReportsClient: GetPublicReportsClient;

    constructor(http: HttpClient) {
        this.getOccurrencesClient = new GetOccurrencesClient(http);
        this.createReportClient = new CreateReportClient(http);
        this.getReportsClient = new GetReportsClient(http);
        this.getReportClient = new GetReportClient(http);
        this.verifyReportClient = new VerifyReportClient(http);
        this.deleteReportClient = new DeleteReportClient(http);
        this.deleteOccurrenceClient = new DeleteOccurrenceClient(http);
        this.sendNotificationClient = new SendNotificationClient(http);
        this.getReportsAnalyticsClient = new GetReportsAnalyticsClient(http);
        this.getPublicReportsClient = new GetPublicReportsClient(http);
    }

    getAllOccurrences(countryId: number | undefined) {
        return this.getOccurrencesClient.handle(countryId);
    }

    createReport(payload: ICreateReportCommand) {
        return this.createReportClient.handle(new CreateReportCommand(payload));
    }

    getAllReports(payload) {
        return this.getReportsClient.handle(
            payload.isVerified,
            payload.countryId
        );
    }

    getReport(id: number) {
        return this.getReportClient.handle(id);
    }

    verifyReport(payload: IVerifyReportCommand) {
        return this.verifyReportClient.handle(new VerifyReportCommand(payload));
    }

    sendNotification(payload: ISendNotificationCommand) {
        return this.sendNotificationClient.handle(
            new SendNotificationCommand(payload)
        );
    }

    deleteReport(payload: IDeleteReportCommand) {
        return this.deleteReportClient.handle(new DeleteReportCommand(payload));
    }

    deleteOccurrence(payload: IDeleteOccurrenceCommand) {
        return this.deleteOccurrenceClient.handle(
            new DeleteOccurrenceCommand(payload)
        );
    }

    getReportsAnalytics(payload: DataQueryTimeSpan) {
        return this.getReportsAnalyticsClient.handle(payload);
    }

    getPublicReports() {
        return this.getPublicReportsClient.handle();
    }
}
