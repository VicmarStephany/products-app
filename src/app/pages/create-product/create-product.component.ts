import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EMPTY, Observable, Subject } from 'rxjs';
import { ProductModel } from 'src/app/models/product.model';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { AngularFireStorage } from "@angular/fire/storage";
import { takeUntil, catchError } from "rxjs/operators";
import { ValidateService } from 'src/app/services/validate/validate.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { STORAGE_PATH } from 'src/app/shared/utils/storage.const'

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  product: FormGroup;
  data: any;

  destroy$: Subject<null> = new Subject();
  img: File = null;
  imgPreview: string | ArrayBuffer;
  submitted = false;
  downloadURL: Observable<string>;
  uploadProgress$: Observable<number>;

  constructor(private fb: FormBuilder, private db: FirebaseService, private storage: AngularFireStorage,
    private validateService: ValidateService, private storageService: StorageService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.product = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: [null, [Validators.required, this.image.bind(this)]]
    });

    this.product.get('image').valueChanges.pipe(takeUntil(this.destroy$)).subscribe((newValue) => {
      this.handleFileChange(newValue.files);
    });
  }

  /**Creates a new product 
   * @description Set the data and calls the create function
  */
  createProduct() {
    this.submitted = true;
    const mediaFolderPath = STORAGE_PATH;
    let imageData: File = this.product.get('image').value['_files'][0];

    this.data = {
      name: this.product.get('name').value,
      description: this.product.get('description').value,
      image: imageData.name
    };

    const { downloadUrl$, uploadProgress$ } = this.storageService.uploadFileAndGetMetadata(mediaFolderPath, this.img);

    this.uploadProgress$ = uploadProgress$;

    downloadUrl$
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          this.snackBar.open('Ha ocurrido un error. Intente de nuevo', 'Cerrar', {
            duration: 4000,
          });
          return EMPTY;
        })
      ).subscribe((downloadUrl) => {
        this.submitted = false;
        console.log(downloadUrl)

        this.db.createProduct(this.data, downloadUrl).then(res => {
          console.log(res);
          this.snackBar.open('El producto se ha añadido satisfactoriamente', 'Cerrar', {
            duration: 3000,
          });
          location.reload();

        })
      });
  }

  /**Custom validator
   * @description Validates the type of the image uploaded
   * @param photoControl : FormControl
   */
  private image(photoControl: AbstractControl): { [key: string]: boolean } | null {
    if (photoControl.value) {
      const [image] = photoControl.value.files;
      return this.validateService.validateFile(image)
        ? null
        : {
          image: true,
        };
    }
    return;
  }

  /**Image preview
   * @description trigered everytime there's a change in the value of the image control.
   * @param image: File
   */
  handleFileChange([image]) {
    this.img = image;
    const reader = new FileReader();
    reader.onload = (loadEvent) => (this.imgPreview = loadEvent.target.result);
    reader.readAsDataURL(image);
  }


  ngOnDestroy() {
    this.destroy$.next(null);
  }
}
