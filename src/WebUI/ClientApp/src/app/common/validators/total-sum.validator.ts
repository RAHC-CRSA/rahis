import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function totalSumValidator(
    totalField: string,
    fieldA: string,
    fieldB: string,
    errorKey: string = 'sumInvalid'
): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors | null => {
        const totalFieldValue = formGroup.get(totalField)?.value;
        const fieldAValue = formGroup.get(fieldA)?.value;
        const fieldBValue = formGroup.get(fieldB)?.value;

        if (
            totalFieldValue != null &&
            fieldAValue != null &&
            fieldBValue != null
        ) {
            const isValid =
                totalFieldValue >= fieldAValue + fieldBValue &&
                fieldAValue <= totalFieldValue - fieldBValue &&
                fieldBValue <= totalFieldValue - fieldAValue;

            return isValid ? null : { [errorKey]: true };
        }

        return null;
    };
}
