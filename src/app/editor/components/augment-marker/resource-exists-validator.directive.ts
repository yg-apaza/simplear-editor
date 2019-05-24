import { Directive, Input } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { WorkspaceService } from 'src/app/shared/workspace/workspace.service';
import { Observable } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';

@Directive({
  selector: '[appResourceExistsValidator]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: ResourceExistsValidatorDirective, multi: true}]
})
export class ResourceExistsValidatorDirective {

  @Input('appResourceExistsValidator') projectId: string;

  constructor(
    public workspaceService: WorkspaceService
  ) { }

  validate(ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.workspaceService.getResourceByName(this.projectId, ctrl.value && ctrl.value.name).pipe(
      map(resource => resource ? null : { resourceExists: true }),
      catchError(() => null),
      first()
    );
  }

}
