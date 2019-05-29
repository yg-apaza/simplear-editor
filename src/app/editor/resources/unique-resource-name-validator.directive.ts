import { Directive, Input } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ResourceService } from 'src/app/shared/resource/resource.service';

@Directive({
  selector: '[appUniqueResourceNameValidator]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: UniqueResourceNameValidator, multi: true}]
})
export class UniqueResourceNameValidator implements AsyncValidator {

  @Input('appUniqueResourceNameValidator') projectId: string;

  constructor(
    public resourceService: ResourceService
  ) {}

  validate(ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.resourceService.isResourceNameTaken(this.projectId, ctrl.value).pipe(
      map(isTaken => isTaken ? { uniqueResourceName: true } : null),
      catchError(() => null)
    );
  }
}
