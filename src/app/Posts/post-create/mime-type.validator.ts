import { AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { FileValidationService } from './validation.service'; // Adjust the path as needed

export const mimeType = (fileValidationService: FileValidationService) => {
  return (control: AbstractControl): Observable<{ [key: string]: any }> => {
    if (!control.value || typeof control.value === 'string') {
      return of({});
    }

    const file = control.value as File;
    return fileValidationService.validateFile(file);
  };
};
