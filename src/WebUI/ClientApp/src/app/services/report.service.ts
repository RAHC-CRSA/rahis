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
    GetControlMeasuresClient,
    GetOccurrencesClient,
    GetOccurrencesQuery,
    GetPublicReportsClient,
    GetReportClient,
    GetReportsAnalyticsClient,
    GetReportsClient,
    ICreateReportCommand,
    IDeleteOccurrenceCommand,
    IDeleteReportCommand,
    IGetOccurrencesQuery,
    ISendNotificationCommand,
    IUpdateReportCommand,
    IVerifyReportCommand,
    SendNotificationClient,
    SendNotificationCommand,
    UpdateReportClient,
    UpdateReportCommand,
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
    private updateReportClient: UpdateReportClient;
    private getReportsClient: GetReportsClient;
    private getReportClient: GetReportClient;
    private verifyReportClient: VerifyReportClient;
    private deleteReportClient: DeleteReportClient;
    private deleteOccurrenceClient: DeleteOccurrenceClient;
    private sendNotificationClient: SendNotificationClient;
    private getReportsAnalyticsClient: GetReportsAnalyticsClient;
    private getPublicReportsClient: GetPublicReportsClient;
    private getControlMeasuresClient: GetControlMeasuresClient;

    constructor(http: HttpClient) {
        this.getOccurrencesClient = new GetOccurrencesClient(http);
        this.createReportClient = new CreateReportClient(http);
        this.updateReportClient = new UpdateReportClient(http);
        this.getReportsClient = new GetReportsClient(http);
        this.getReportClient = new GetReportClient(http);
        this.verifyReportClient = new VerifyReportClient(http);
        this.deleteReportClient = new DeleteReportClient(http);
        this.deleteOccurrenceClient = new DeleteOccurrenceClient(http);
        this.sendNotificationClient = new SendNotificationClient(http);
        this.getReportsAnalyticsClient = new GetReportsAnalyticsClient(http);
        this.getPublicReportsClient = new GetPublicReportsClient(http);
        this.getControlMeasuresClient = new GetControlMeasuresClient(http);
    }

    getAllOccurrences(payload: IGetOccurrencesQuery) {
        const request = new GetOccurrencesQuery(payload);

        return this.getOccurrencesClient.handle(request);
    }

    createReport(payload: ICreateReportCommand) {
        return this.createReportClient.handle(new CreateReportCommand(payload));
    }

    updateReport(payload: IUpdateReportCommand) {
        return this.updateReportClient.handle(new UpdateReportCommand(payload));
    }

    getAllReports(payload) {
        return this.getReportsClient.handle(
            payload.isVerified,
            payload.countryId,
            payload.userId,
            payload.fromMonths
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

    getReportsAnalytics(payload: {
        timeSpan: DataQueryTimeSpan;
        countryId?: number | undefined;
    }) {
        return this.getReportsAnalyticsClient.handle(
            payload.timeSpan,
            payload.countryId
        );
    }

    getPublicReports() {
        return this.getPublicReportsClient.handle();
    }

    getControlMeasures() {
        return this.getControlMeasuresClient.handle();
    }
}
