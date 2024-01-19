import { Injectable } from '@angular/core';
import {
    AddInstitutionClient,
    AddInstitutionCommand,
    AddParaProfessionalClient,
    AddParaProfessionalCommand,
    DeleteInstitutionClient,
    DeleteInstitutionCommand,
    DeleteParaProfessionalClient,
    DeleteParaProfessionalCommand,
    GetInstitutionsClient,
    GetParaProfessionalsClient,
    IAddInstitutionCommand,
    IAddParaProfessionalCommand,
    IDeleteInstitutionCommand,
    IDeleteParaProfessionalCommand,
    IUpdateInstitutionCommand,
    IUpdateParaProfessionalCommand,
    InstitutionDto,
    ParaProfessionalDto,
    UpdateInstitutionClient,
    UpdateInstitutionCommand,
    UpdateParaProfessionalClient,
    UpdateParaProfessionalCommand,
} from '../web-api-client';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetParaProfessionalsQuery } from 'app/models';

@Injectable({
    providedIn: 'root',
})
export class InstitutionService {
    // Clients
    getParaProfessionalsClient: GetParaProfessionalsClient;
    getInstitutionsClient: GetInstitutionsClient;
    addParaProfessionalClient: AddParaProfessionalClient;
    updateParaProfessionalClient: UpdateParaProfessionalClient;
    deleteParaProfessionalClient: DeleteParaProfessionalClient;
    addInstitutionClient: AddInstitutionClient;
    updateInstitutionClient: UpdateInstitutionClient;
    deleteInstitutionClient: DeleteInstitutionClient;

    constructor(http: HttpClient) {
        this.getParaProfessionalsClient = new GetParaProfessionalsClient(http);
        this.getInstitutionsClient = new GetInstitutionsClient(http);
        this.addParaProfessionalClient = new AddParaProfessionalClient(http);
        this.updateParaProfessionalClient = new UpdateParaProfessionalClient(
            http
        );
        this.deleteParaProfessionalClient = new DeleteParaProfessionalClient(
            http
        );
        this.addInstitutionClient = new AddInstitutionClient(http);
        this.updateInstitutionClient = new UpdateInstitutionClient(http);
        this.deleteInstitutionClient = new DeleteInstitutionClient(http);
    }

    getAllParaProfessionals(payload: GetParaProfessionalsQuery) {
        return this.getParaProfessionalsClient.handle(
            payload?.institutionId,
            payload?.countryId
        );
    }

    addParaProfessional(
        payload: IAddParaProfessionalCommand
    ): Observable<ParaProfessionalDto> {
        const request = new AddParaProfessionalCommand(payload);

        return this.addParaProfessionalClient.handle(request);
    }

    updateParaProfessional(
        payload: IUpdateParaProfessionalCommand
    ): Observable<ParaProfessionalDto> {
        const request = new UpdateParaProfessionalCommand(payload);

        return this.updateParaProfessionalClient.handle(request);
    }

    deleteParaProfessional(payload: IDeleteParaProfessionalCommand) {
        return this.deleteParaProfessionalClient.handle(
            new DeleteParaProfessionalCommand(payload)
        );
    }

    getAllInstitutions(countryId: number = undefined) {
        return this.getInstitutionsClient.handle(countryId);
    }

    addInstitution(
        payload: IAddInstitutionCommand
    ): Observable<InstitutionDto> {
        const request = new AddInstitutionCommand(payload);

        return this.addInstitutionClient.handle(request);
    }

    updateInstitution(
        payload: IUpdateInstitutionCommand
    ): Observable<InstitutionDto> {
        const request = new UpdateInstitutionCommand(payload);

        return this.updateInstitutionClient.handle(request);
    }

    deleteInstitution(payload: IDeleteInstitutionCommand) {
        return this.deleteInstitutionClient.handle(
            new DeleteInstitutionCommand(payload)
        );
    }
}
