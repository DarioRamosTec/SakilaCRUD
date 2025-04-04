import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordConfirmationValidator(name: string = "password"): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let password = control.parent?.get(name)
    if (password && password.value == control.value) {
      return null
    }
    return { passwordConfirmation: {value: ""} };
  };
}
