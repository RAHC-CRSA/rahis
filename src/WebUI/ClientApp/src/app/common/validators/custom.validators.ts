import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

export class CustomValidators implements Validators {
  static confirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmedValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  static patternValidator(controlName: string, regexPattern: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const regex = new RegExp(regexPattern);
      if (control && control.value && !regex.test(control.value)) {
        return { invalidPassword: true };
      }

      return null;
    };
  }
}
