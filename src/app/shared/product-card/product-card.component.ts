import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/models/product.model';
import { EditProductComponent } from 'src/app/pages/edit-product/edit-product.component';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product: ProductModel;

  confirmation: boolean = false;

  constructor(private db: FirebaseService, private router: Router, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  editProduct() {
    const dialogRef = this.dialog.open(EditProductComponent, {
      //width: '250px',
      data: { product: this.product }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })

  }

  /**Confirm the delete action
   * @param id
   * @description Id of the product to delete
   */
  confirmDelete(id) {
    console.log(id)
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      //width: '250px',
      data: { confirmation: this.confirmation }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.confirmation = result;
      if (this.confirmation == true) {
        this.deleteProduct(id);
      }
    });
  }

  /**Deletes the product from database 
   * @param id : Id of the product
   * 
  */
  deleteProduct(id) {
    this.db.deleteProduct(id).then(res => {
      console.log(res);
      this.snackBar.open('Se ha eliminado el producto', 'Cerrar', {
        duration: 3000,
      });
      location.reload();
    });

  }






}
