import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, take, tap } from 'rxjs/operators';
import { UserService } from '../user/user.service';

export function rePasswordValidatorFactory(targetControl: AbstractControl): ValidatorFn {
  return function rePasswordValidator(control: AbstractControl): ValidationErrors | null {
    const areEqual = targetControl.value === control.value;
    return areEqual ? null : { rePasswordValidator: true }
  }
}

export class ValidateUsername {
  static createValidator(service: UserService) {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return control.valueChanges.pipe(
        debounceTime(700),
        distinctUntilChanged(),
        take(1),
        switchMap(() => service.checkUsernameExists(control.value)),
        tap(() => control.markAsTouched()),
        map(exists => {
          return exists ? { userExist: true } : null
        })
      );
    };
  }
}