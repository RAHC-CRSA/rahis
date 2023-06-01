import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { ReportsState } from '../../../../store';
import { loadOccurrences } from '../../../../store/actions';
import { getOccurrences } from '../../../../store/reducers';
import { OccurrenceDto } from '../../../../../../web-api-client';

@Component({
    selector: 'app-occurrence-info',
    templateUrl: './occurrence-info.component.html',
    styleUrls: ['./occurrence-info.component.scss'],
})
export class OccurrenceInfoComponent implements OnInit {
    @Input() formData: any;

    occurrences$: Observable<OccurrenceDto[] | null | undefined>;

    @Output() previous = new EventEmitter();
    @Output() submit = new EventEmitter();

    occurrenceInfo: FormGroup;
    occurrences: any[];
    placeholder: string;
    newOccurrence: boolean;
    otherLabel: string;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<ReportsState>
    ) {}

    ngOnInit() {
        this.initForm();

        this.placeholder = 'Select an occurence';
        this.otherLabel = 'Other (this is a new occurrence)';

        this.store.dispatch(loadOccurrences());
        this.occurrences$ = this.store.select(getOccurrences);
        this.occurrences$.subscribe((items) => {
            this.occurrences =
                items != null
                    ? items
                          .filter((e) => e.id != null)
                          .map((item) => ({
                              value: item.id,
                              label: item.title,
                          }))
                    : [];

            const placeholder = { value: '', label: this.placeholder };
            const other = { value: 'other', label: this.otherLabel };

            this.occurrences = [placeholder, ...this.occurrences, other];
        });
    }

    get f() {
        return this.occurrenceInfo.value;
    }

    initForm() {
        this.occurrenceInfo = this.formBuilder.group({
            newOccurrence: [this.formData.newOccurrence],
            occurrence: [this.formData.occurrence],
        });
    }

    onPrevious() {
        this.previous.emit();
    }

    onSubmit() {
        this.submit.emit(this.occurrenceInfo.value);
    }

    onCheckOccurrence(isNew: boolean) {
        this.newOccurrence = isNew;
    }

    onOtherChanged(other: boolean) {
        this.newOccurrence = other;
        this.occurrenceInfo.patchValue({ newOccurrence: this.newOccurrence });
    }

    onValueChanged(occurrence: any) {
        this.occurrenceInfo.patchValue({ occurrence });
    }
}
