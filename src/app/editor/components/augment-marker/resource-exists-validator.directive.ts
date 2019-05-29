import { Directive, Input } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AbstractControl, ValidationErrors, AsyncValidator } from '@angular/forms';
import { Observable } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { ResourceService } from 'src/app/shared/resource/resource.service';

@Directive({
  selector: '[appResourceExistsValidator]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: ResourceExistsValidator, multi: true}]
})
export class ResourceExistsValidator implements AsyncValidator {

  @Input('appResourceExistsValidator') projectId: string;

  constructor(
    public resourceService: ResourceService
  ) { }

  validate(ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.resourceService.get(this.projectId, ctrl.value && ctrl.value.id).pipe(
      map(resource => resource.id ? null : { resourceExists: true }),
      catchError(() => null),
      first()
    );
  }

}
