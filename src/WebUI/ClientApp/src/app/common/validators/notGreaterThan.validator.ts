import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function numberNotGreaterValidator(
    controlName: string,
    matchingControlName: string
): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
        const control = formGroup.get(controlName);
        const matchingControl = formGroup.get(matchingControlName);

        if (!control || !matchingControl) {
            return null;
        }

        if (control.value < matchingControl.value) {
            return { numberNotGreater: true };
        }

        return null;
    };
}
