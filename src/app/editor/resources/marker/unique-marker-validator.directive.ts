import { Directive, Input } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { WorkspaceService } from 'src/app/shared/workspace/workspace.service';
import { Observable } from 'rxjs';
import { map, catchError, first } from 'rxjs/operators';
import { MarkerComponent } from './marker.component';

@Directive({
  selector: '[appUniqueMarkerValidator]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: UniqueMarkerValidator, multi: true}]
})
export class UniqueMarkerValidator implements AsyncValidator {

  @Input('appUniqueMarkerValidator') projectId: string;

  constructor(
    public workspaceService: WorkspaceService
  ) { }

  validate(ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.workspaceService.isResourceContentTaken(this.projectId, ctrl.value, MarkerComponent.RESOURCE_TYPE).pipe(
      map(isTaken => isTaken ? { uniqueMarker: true } : null),
      catchError(() => null),
      first()
    );
  }

}
