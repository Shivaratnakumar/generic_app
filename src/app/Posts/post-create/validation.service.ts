import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FileValidationService {
  constructor() {}

  validateFile(file: File): Observable<{ [key: string]: any }> {
    return new Observable((observer: Observer<{ [key: string]: any }>) => {
      const fileReader = new FileReader();
      fileReader.addEventListener('loadend', () => {
        const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
        let header = '';
        for (let i = 0; i < arr.length; i++) {
          header += arr[i].toString(16);
        }

        let isValid = false;
        switch (header) {
          case '89504e47':
            isValid = true; // PNG
            break;
          case 'ffd8ffe0':
          case 'ffd8ffe1':
          case 'ffd8ffe2':
            isValid = true; // JPEG
            break;
          case '47494638':
            isValid = true; // GIF
            break;
          default:
            isValid = false; // Other file type
            break;
        }

        if (isValid) {
          observer.next({});
        } else {
          observer.next({ invalidMimeType: true });
        }
        observer.complete();
      });

      fileReader.addEventListener('error', () => {
        observer.next({ invalidMimeType: true });
        observer.complete();
      });

      fileReader.readAsArrayBuffer(file);
    });
  }
}
