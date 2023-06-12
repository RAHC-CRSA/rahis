import {
    Component,
    EventEmitter,
    OnInit,
    AfterContentChecked,
    Output,
    ChangeDetectorRef,
} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { Store } from '@ngrx/store';
import { ReportState } from 'app/modules/reports/store';
import {
    addParaProfessional,
    loadInstitutions,
} from 'app/modules/reports/store/actions';
import {
    getInstitutions,
    getReportsLoading,
} from 'app/modules/reports/store/selectors';
import {
    IAddParaProfessionalCommand,
    InstitutionDto,
} from 'app/web-api-client';
import { Observable, map, startWith } from 'rxjs';

@Component({
    selector: 'app-add-para-professional',
    templateUrl: './add-para-professional.component.html',
    styleUrls: ['./add-para-professional.component.scss'],
    animations: fuseAnimations,
})
export class AddParaProfessionalComponent
    implements OnInit, AfterContentChecked
{
    @Output() close = new EventEmitter();

    otherOption: string = 'Other';
    newInstitution: boolean = false;

    institutionControl = new FormControl();

    selectedInstitution: InstitutionDto;

    institutions$: Observable<InstitutionDto[] | null | undefined>;
    institutions: InstitutionDto[];
    filteredInstitutions: Observable<InstitutionDto[]>;

    professionalForm: FormGroup;

    loading$: Observable<boolean>;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<ReportState>,
        private changeDetector: ChangeDetectorRef
    ) {}

    ngAfterContentChecked(): void {
        this.changeDetector.detectChanges();
    }

    ngOnInit() {
        this.initForm();
        this.initData();
    }

    initForm() {
        this.professionalForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            position: ['', [Validators.required]],
            email: ['', [Validators.required]],
            phone: ['', [Validators.required]],
            institution: ['', [Validators.required]],
        });
    }

    initData() {
        this.store.dispatch(loadInstitutions());
        this.institutions$ = this.store.select(getInstitutions);
        this.institutions$.subscribe((institutions) => {
            this.institutions = [
                ...institutions,
                new InstitutionDto({ id: null, name: this.otherOption }),
            ];

            this.filteredInstitutions =
                this.institutionControl.valueChanges.pipe(
                    startWith({} as InstitutionDto),
                    map((institution) =>
                        institution && typeof institution === 'object'
                            ? institution.name
                            : institution
                    ),
                    map((name: string) =>
                        name
                            ? this._filterInstitution(name)
                            : this.institutions.slice()
                    )
                );
        });
        this.loading$ = this.store.select(getReportsLoading);
    }

    get f() {
        return this.professionalForm.controls;
    }

    private _filterInstitution(name: string): InstitutionDto[] {
        return this.institutions.filter(
            (option) =>
                option.name.toLowerCase().indexOf(name.toLowerCase()) === 0
        );
    }

    displayInstitutionFn(institution: InstitutionDto): string {
        return institution ? institution.name : '';
    }

    updateSelectedInstitution(event: any) {
        this.selectedInstitution = event.option.value;
        const institution: InstitutionDto = event.option.value;

        this.newInstitution =
            institution.name.toLowerCase() === this.otherOption.toLowerCase();

        this.professionalForm.patchValue({ institution: institution.id });

        if (this.newInstitution) this.institutionControl.disable();
    }

    onCheckInstitution(isNew: boolean) {
        this.newInstitution = isNew;

        if (!this.newInstitution) {
            this.institutionControl.enable();
        }
    }

    onAddInstitutionClosed() {
        this.onCheckInstitution(false);
        this.institutionControl.setValue('', { emitEvent: true });
        this.professionalForm.patchValue(
            { institution: '' },
            { emitEvent: true }
        );
    }

    onCancel() {
        this.professionalForm.reset();
        this.close.emit();
    }

    onSubmit() {
        const payload: IAddParaProfessionalCommand = {
            name: this.f.name.value,
            position: this.f.position.value,
            email: this.f.email.value,
            phone: this.f.phone.value,
            institutionId: this.f.institution.value,
        };

        this.store.dispatch(addParaProfessional({ payload }));
        this.close.emit();
    }
}
