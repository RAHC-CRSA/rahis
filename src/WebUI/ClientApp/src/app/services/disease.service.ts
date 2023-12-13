import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    AddDiseaseClient,
    AddDiseaseCommand,
    DeleteDiseaseClient,
    DeleteDiseaseCommand,
    GetDiseasesClient,
    GetTransBoundaryDiseasesClient,
    GetTransBoundaryDiseasesQuery,
    IAddDiseaseCommand,
    IDeleteDiseaseCommand,
    IGetTransBoundaryDiseasesQuery,
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

    getTransBoundaryDiseases(payload: IGetTransBoundaryDiseasesQuery) {
        const request = new GetTransBoundaryDiseasesQuery(payload);

        return this.getTransBoundaryDiseasesClient.handle(request);
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
