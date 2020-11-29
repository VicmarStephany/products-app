import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  private imageFileTypes = [

    'image/jpg',
    'image/jpeg',
    'image/png',
 ];

  validateFile(file: File): boolean {
    return this.imageFileTypes.includes(file.type);
  }
}
