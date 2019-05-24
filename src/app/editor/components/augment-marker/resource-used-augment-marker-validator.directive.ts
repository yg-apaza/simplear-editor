import { Directive, Input } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AbstractControl, ValidationErrors, AsyncValidator } from '@angular/forms';
import { WorkspaceService } from 'src/app/shared/workspace/workspace.service';
import { Observable } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { AugmentMarkerComponent } from './augment-marker.component';

@Directive({
  selector: '[appResourceUsedAugmentMarkerValidator]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: ResourceUsedAugmentMarkerValidator, multi: true}]
})
export class ResourceUsedAugmentMarkerValidator implements AsyncValidator {

  @Input('appResourceUsedAugmentMarkerValidator') projectId: string;

  constructor(
    public workspaceService: WorkspaceService
  ) { }

  validate(ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.workspaceService.isResourceUsedInComponent(
      this.projectId,
      ctrl.value && ctrl.value.name,
      AugmentMarkerComponent.COMPONENT_TYPE
      ).pipe(
        map(isTaken => isTaken ? { resourceUsedInAugmentMarker: true } : null),
        catchError(() => null),
        first()
    );
  }

}
