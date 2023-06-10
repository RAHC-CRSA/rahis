import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    AddSpeciesClient,
    AddSpeciesCommand,
    DeleteSpeciesClient,
    DeleteSpeciesCommand,
    GetSpeciesClient,
    IAddSpeciesCommand,
    IDeleteSpeciesCommand,
    IUpdateSpeciesCommand,
    UpdateSpeciesClient,
    UpdateSpeciesCommand,
} from '../web-api-client';

@Injectable({
    providedIn: 'root',
})
export class SpeciesService {
    // Clients
    getSpeciesClient: GetSpeciesClient;
    addSpeciesClient: AddSpeciesClient;
    updaeSpeciesClient: UpdateSpeciesClient;
    deleteSpeciesClient: DeleteSpeciesClient;

    constructor(http: HttpClient) {
        this.getSpeciesClient = new GetSpeciesClient(http);
        this.addSpeciesClient = new AddSpeciesClient(http);
        this.updaeSpeciesClient = new UpdateSpeciesClient(http);
        this.deleteSpeciesClient = new DeleteSpeciesClient(http);
    }

    getAllSpecies() {
        return this.getSpeciesClient.handle();
    }

    addSpecies(payload: IAddSpeciesCommand) {
        var request = new AddSpeciesCommand({
            name: payload.name,
        });
        return this.addSpeciesClient.handle(request);
    }

    updateSpecies(payload: IUpdateSpeciesCommand) {
        var request = new UpdateSpeciesCommand({
            id: payload.id,
            name: payload.name,
        });

        return this.updaeSpeciesClient.handle(request);
    }

    deleteSpecies(payload: IDeleteSpeciesCommand) {
        return this.deleteSpeciesClient.handle(
            new DeleteSpeciesCommand(payload)
        );
    }
}
