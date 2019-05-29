import { Directive, Input } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AbstractControl, ValidationErrors, AsyncValidator } from '@angular/forms';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AugmentMarkerComponent } from './augment-marker.component';
import { ComponentService } from 'src/app/shared/component/component.service';

@Directive({
  selector: '[appResourceUsedAugmentMarkerValidator]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: ResourceUsedAugmentMarkerValidator, multi: true}]
})
export class ResourceUsedAugmentMarkerValidator implements AsyncValidator {

  @Input('appResourceUsedAugmentMarkerValidator') projectId: string;

  constructor(
    public componentService: ComponentService
  ) { }

  validate(ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.componentService.isResourceUsedInComponentByType(
      this.projectId,
      ctrl.value && ctrl.value.id,
      AugmentMarkerComponent.COMPONENT_TYPE
      ).pipe(
        map(isTaken => isTaken ? { resourceUsedInAugmentMarker: true } : null),
        catchError(() => null)
    );
  }

}
