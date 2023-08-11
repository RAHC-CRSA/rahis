import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { InstitutionsState } from 'app/modules/institutions/store';
import {
    loadInstitutions,
    updateInstitution,
} from 'app/modules/institutions/store/actions';
import {
    getFeedback,
    getInstitutions,
    getInstitutionsLoaded,
    getInstitutionsLoading,
} from 'app/modules/institutions/store/selectors';
import {
    IUpdateInstitutionCommand,
    InstitutionDto,
    ServerResponse,
} from 'app/web-api-client';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-edit-institution',
    templateUrl: './edit-institution.component.html',
    styleUrls: ['./edit-institution.component.scss'],
})
export class EditInstitutionComponent implements OnInit {
    institutionId: number;
    institution: InstitutionDto;
    institutionForm: FormGroup;
    loading$: Observable<boolean>;
    feedback$: Observable<ServerResponse | null | undefined>;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<InstitutionsState>,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.institutionId = +params.get('id');
        });

        this.initForm();
        this.initData();
    }

    initData() {
        this.store.select(getInstitutionsLoaded).subscribe((loaded) => {
            if (!loaded) this.store.dispatch(loadInstitutions());
        });
        this.store.select(getInstitutions).subscribe((institutions) => {
            this.institution = institutions.find(
                (e) => e.id === this.institutionId
            );

            this.institutionForm.patchValue(this.institution);
        });
        this.loading$ = this.store.select(getInstitutionsLoading);
        this.feedback$ = this.store.select(getFeedback);
    }

    initForm() {
        this.institutionForm = this.formBuilder.group({
            name: ['', Validators.required],
            publicSector: ['', Validators.required],
            type: [''],
        });
    }

    get f() {
        return this.institutionForm.value;
    }

    submit() {
        const payload: IUpdateInstitutionCommand = {
            institutionId: this.institution.id,
            name: this.f.name,
            publicSector: this.f.publicSector,
            type: this.f.type,
        };

        this.store.dispatch(updateInstitution({ payload }));
    }
}
