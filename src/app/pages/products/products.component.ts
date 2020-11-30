import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductModel } from 'src/app/models/product.model';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { CreateProductComponent } from '../create-product/create-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Array<ProductModel> = [];
  test: Array<ProductModel> = [];

  constructor(private db: FirebaseService, public modal: MatDialog) { }

  ngOnInit(): void {
    
    this.db.getProducts().then(colSnap => {
      colSnap.forEach(snap => {
        let product: any = snap.payload.doc.data();
        console.log(product);
        this.products.push(product);
      })
    })
  }

  openModal() {
    const modal = this.modal.open(CreateProductComponent);

    modal.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
    

}
