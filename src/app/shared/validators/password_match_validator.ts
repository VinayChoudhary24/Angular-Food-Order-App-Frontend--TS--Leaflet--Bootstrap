import { AbstractControl } from "@angular/forms"

export const PasswordsMatchValidator = (passwordControlName: string, confirmPasswordControlName: string) => {
    // Store the Validation
    const validator = (form: AbstractControl) => {
        // The Validation
        const passwordControl = form.get(passwordControlName);
        const ConfirmPasswordControl = form.get(confirmPasswordControlName);
        // Compare both The Values i.e Password and ConfirmPassword
        // When there is No Value i.e By-Pass the Compiler Error
        if(!passwordControl || !ConfirmPasswordControl) return;

        // When the Values of Password and ConfirmPassword Differ i.e Not Same
        if(passwordControl.value !== ConfirmPasswordControl.value) {
            // Show Error Message
            ConfirmPasswordControl.setErrors({notMatch: true});
        }else {
            // When the Values Matches for Password and Confirm Password
            const errors = ConfirmPasswordControl.errors;
            if(!errors) return;
            // Remove the Conditions
            delete errors.notMatch;
            ConfirmPasswordControl.setErrors(errors);
        }
    }
    return validator;
}
