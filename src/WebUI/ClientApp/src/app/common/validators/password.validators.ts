import {
    AbstractControl,
    FormGroup,
    ValidationErrors,
    Validators,
} from '@angular/forms';

export class PasswordValidator implements Validators {
    public static PasswordMatch(
        control: AbstractControl
    ): ValidationErrors | null {
        let parent = control.parent;
        let password = parent?.get('password'); // to get value in input tag
        if (password) {
            let confirmPassword = control.value; // to get value in input tag
            if (password.value !== confirmPassword) {
                return { passwordMatch: true };
            } else {
                return null;
            }
        }

        return null;
    }

    public static PasswordRule(
        control: AbstractControl
    ): ValidationErrors | null {
        let password = control.value; // to get value in input tag
        let pattern = new RegExp(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$^+=!*()@%&]).{8,}$'
        );
        if (!pattern.test(password)) {
            return { passwordRule: true };
        } else {
            return null;
        }
    }
}
