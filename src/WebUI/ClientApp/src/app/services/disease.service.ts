import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    AddDiseaseClient,
    AddDiseaseCommand,
    DeleteDiseaseClient,
    DeleteDiseaseCommand,
    GetDiseasesClient,
    GetTransBoundaryDiseasesClient,
    IAddDiseaseCommand,
    IDeleteDiseaseCommand,
} from '../web-api-client';

@Injectable({
    providedIn: 'root',
})
export class DiseaseService {
    // Clients
    getDiseasesClient: GetDiseasesClient;
    getTransBoundaryDiseasesClient: GetTransBoundaryDiseasesClient;
    addDiseaseClient: AddDiseaseClient;
    deleteDiseaseClient: DeleteDiseaseClient;

    constructor(http: HttpClient) {
        this.getDiseasesClient = new GetDiseasesClient(http);
        this.getTransBoundaryDiseasesClient =
            new GetTransBoundaryDiseasesClient(http);
        this.addDiseaseClient = new AddDiseaseClient(http);
        this.deleteDiseaseClient = new DeleteDiseaseClient(http);
    }

    getAllDiseases() {
        return this.getDiseasesClient.handle();
    }

    getTransBoundaryDiseases(payload: number | undefined) {
        return this.getTransBoundaryDiseasesClient.handle(payload);
    }

    addDisease(payload: IAddDiseaseCommand) {
        const request = new AddDiseaseCommand(payload);

        return this.addDiseaseClient.handle(request);
    }

    deleteDisease(payload: IDeleteDiseaseCommand) {
        return this.deleteDiseaseClient.handle(
            new DeleteDiseaseCommand(payload)
        );
    }
}
