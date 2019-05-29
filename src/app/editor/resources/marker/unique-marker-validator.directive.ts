import { Directive, Input } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MarkerComponent } from './marker.component';
import { ResourceService } from 'src/app/shared/resource/resource.service';

@Directive({
  selector: '[appUniqueMarkerValidator]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: UniqueMarkerValidator, multi: true}]
})
export class UniqueMarkerValidator implements AsyncValidator {

  @Input('appUniqueMarkerValidator') projectId: string;

  constructor(
    public resourceService: ResourceService
  ) { }

  validate(ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.resourceService.isResourceContentTaken(this.projectId, ctrl.value, MarkerComponent.RESOURCE_TYPE).pipe(
      map(isTaken => isTaken ? { uniqueMarker: true } : null),
      catchError(() => null)
    );
  }

}
