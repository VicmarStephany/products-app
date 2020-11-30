import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { ProductModel } from 'src/app/models/product.model';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { STORAGE_PATH } from 'src/app/shared/utils/storage.const';
import { image } from 'src/app/shared/utils/validators.custom';

export interface ModalData {
  product: ProductModel
}

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  productEdit: FormGroup;
  data: any;

  destroy$: Subject<null> = new Subject();
  img: File = null;
  imgPreview: string | ArrayBuffer;
  submitted = false;
  downloadURL: Observable<string>;
  uploadProgress$: Observable<number>;


  constructor(public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public dataModal: ModalData,
    private fb: FormBuilder, private db: FirebaseService,
    private storageService: StorageService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.productEdit = this.fb.group({
      name: [this.dataModal.product.name, Validators.required],
      description: [this.dataModal.product.description, Validators.required],
      image: [this.dataModal.product.image, [Validators.required, image.bind(this)]]
    });

    this.productEdit.get('image').valueChanges.pipe(takeUntil(this.destroy$)).subscribe((newValue) => {
      this.handleFileChange(newValue.files);
    });

  }

  /**
   * Edit information of a product
   * 
   */
  editProduct() {

    this.data = {
      name: this.productEdit.get('name').value,
      description: this.productEdit.get('description').value,
      image: this.productEdit.get('image').value
    };

    this.submitted = true;

    if (this.dataModal.product.image != this.data.image) {
      this.editWithImage();

    } else {

      this.db.updateProduct(this.dataModal.product.id, this.data).then(res => {
        console.log(res);
        this.snackBar.open('El producto se ha editado satisfactoriamente', 'Cerrar', {
          duration: 3000,
        });
        location.reload();

      })
    }

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

  /**
   * Update the product when there's a new image
   */
  editWithImage() {
    const mediaFolderPath = STORAGE_PATH;
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

        this.data = {
          name: this.productEdit.get('name').value,
          description: this.productEdit.get('description').value,
          image: downloadUrl
        };

        this.db.updateProduct(this.dataModal.product.id, this.data).then(res => {
          console.log(res);
          this.snackBar.open('El producto se ha editado satisfactoriamente', 'Cerrar', {
            duration: 3000,
          });
          location.reload();

        })
      });
  }

}
